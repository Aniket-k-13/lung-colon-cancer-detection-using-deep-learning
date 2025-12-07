from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import torch
import io
import base64
import cv2
import numpy as np
from PIL import Image

from model.model_loader import load_model
from model.gradcam import GradCAM
from utils.preprocess import preprocess_image
import database

app = FastAPI(title="Lung Cancer Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()
database.init_db()

@app.get("/")
def home():
    return {"message": "Hybrid ML Model API is running"}

@app.post("/predict")
async def predict(
    files: List[UploadFile] = File(...),
    name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...)
):
    results = []
    
    # 1. Process all files individually
    for file in files:
        try:
            contents = await file.read()
            input_tensor = preprocess_image(io.BytesIO(contents))
            
            # Inference
            target_layer = model.get_target_layer()
            grad_cam = GradCAM(model, target_layer)
            heatmap, class_idx = grad_cam(input_tensor)
            
            probabilities = torch.nn.functional.softmax(model(input_tensor), dim=1)[0]
            confidence = float(probabilities[class_idx])
            
            # Map 0/1 to labels
            class_names = ["Non-Cancer", "Cancer"]
            predicted_class = class_names[class_idx]
            
            # Heatmap Visualization
            heatmap = np.uint8(255 * heatmap)
            heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
            original_img = Image.open(io.BytesIO(contents)).convert("RGB").resize((224, 224))
            original_img = np.array(original_img)
            original_img = cv2.cvtColor(original_img, cv2.COLOR_RGB2BGR)
            superimposed_img = cv2.addWeighted(original_img, 0.6, heatmap, 0.4, 0)
            _, buffer = cv2.imencode('.jpg', superimposed_img)
            heatmap_b64 = base64.b64encode(buffer).decode('utf-8')
            
            results.append({
                "filename": file.filename,
                "class": predicted_class,
                "confidence": round(confidence, 4),
                "heatmap": f"data:image/jpeg;base64,{heatmap_b64}"
            })
            
        except Exception as e:
            print(f"Error processing {file.filename}: {e}")
            continue

    if not results:
        raise HTTPException(status_code=500, detail="No images could be processed")

    # 2. AGGREGATE LOGIC: Decide the final diagnosis for the patient
    # Priority: If ANY scan is Cancer, the patient is marked as Cancer.
    cancer_scans = [r for r in results if r['class'] == "Cancer"]
    
    if cancer_scans:
        final_diagnosis = "Cancer"
        # Use the highest confidence among the cancer detections
        final_confidence = max(r['confidence'] for r in cancer_scans)
    else:
        final_diagnosis = "Non-Cancer"
        # Use the highest confidence among the non-cancer detections
        final_confidence = max(r['confidence'] for r in results)

    # 3. SAVE SINGLE RECORD TO DATABASE
    database.add_patient_record(name, age, gender, final_diagnosis, final_confidence)

    # Return summary + individual details
    return {
        "summary": {
            "diagnosis": final_diagnosis,
            "confidence": final_confidence,
            "scan_count": len(files),
            "positive_scans": len(cancer_scans)
        },
        "results": results
    }

# ... (Keep existing @app.get("/patients"), @app.delete("/patients") and @app.get("/metrics")) ...
@app.get("/patients")
def get_patients():
    return database.get_all_patients()

@app.delete("/patients")
def delete_all_records():
    database.clear_all_patients()
    return {"message": "All patient records deleted successfully"}

@app.get("/metrics")
def get_metrics():
    return {
        "accuracy": 0.99927,
        "precision": 0.99999,
        "recall": 0.99198,
        "f1_score": 0.99597,
        "loss_curve": [0.8, 0.6, 0.4, 0.2, 0.15, 0.13,0.125,0.125,0.12,0.11,0.10,],
        "acc_curve": [0.5, 0.65, 0.75, 0.85, 0.92, 0.945,0.95,0.956,0.960,0.963,0.967]
    }