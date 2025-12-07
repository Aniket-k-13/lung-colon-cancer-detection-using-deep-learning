import torch
import timm
import os

def load_model(model_path="model/efficientnet_best.pth"):
    device = torch.device("cpu")
    
    try:
        print(f"Loading model architecture (timm: efficientnet_b0)...")
        
        # Create model using timm to match your specific weight format
        # num_classes=2 matches your 'classifier.weight' size
        model = timm.create_model('efficientnet_b0', pretrained=False, num_classes=2)
        
        if os.path.exists(model_path):
            print(f"Loading weights from {model_path}...")
            state_dict = torch.load(model_path, map_location=device)
            
            # Load weights
            model.load_state_dict(state_dict, strict=True)
            print("✅ Model weights loaded successfully!")
        else:
            print("⚠️ Warning: Model file not found. Using random weights.")
            
        model.to(device)
        model.eval()
        
        # Attach a helper method for Grad-CAM to find the target layer
        # In timm efficientnet, 'conv_head' is the last spatial layer
        model.get_target_layer = lambda: model.conv_head
        
        return model
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None