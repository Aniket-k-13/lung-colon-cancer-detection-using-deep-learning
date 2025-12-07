# 🩺 **Lung & Colon Cancer Detection Using Deep Learning & Full Web Application**

### 🚀 Hybrid EfficientNet + Vision Transformer | End-to-End AI + Web Platform | 99.93% Accuracy


<img width="1322" height="856" alt="image" src="https://github.com/user-attachments/assets/a38abd56-b976-46fa-8d88-23afe1123585" />
<img width="1919" height="856" alt="image" src="https://github.com/user-attachments/assets/2eb53155-df7d-40bf-b938-711e43c6e6a3" />
<img width="1917" height="862" alt="image" src="https://github.com/user-attachments/assets/099310b9-8d69-46a7-abf5-e4c6b2e12ea7" />

---

# 📌 **Overview**

This repository contains a **complete AI-powered cancer detection system**, combining:

* A **Hybrid Deep Learning Model** (EfficientNet-B0 + Vision Transformer)
* A production-ready **FastAPI backend**
* A modern **React + Tailwind CSS frontend**
* A medical-style dashboard for patient management
* Real-time **Grad-CAM explainability**

The system detects **Lung** and **Colon** cancer from histopathology images, achieving **clinical-grade accuracy**.

---

# ⭐ **Key Features**

### 🧠 **Hybrid AI Model: EfficientNet + ViT**

* CNN captures local tissue textures
* ViT captures global spatial relationships
* Combined → **Superior performance & generalization**

### 🌐 **Full Web Application**

* Upload images
* Get predictions in real time
* View Grad-CAM heatmaps
* Store patient results

### 📊 **High Performance Metrics**

* **99.93% Accuracy**
* **100% Precision**
* **99.59% F1 Score**

---

# 📁 **Dataset: LC25000**

* 25,000 histopathology images
* 5 major cancer classes
* Balanced dataset

### **Preprocessing steps**

* Resize to **224×224**
* RGB normalization
* Augmentations (flip, rotate, zoom)

#**LC25000 LUNG AND COLON HISTOPATHOLOGICAL IMAGE DATASET**

The dataset contains color 25,000 images with 5 classes of 5,000 images each. All images are 768 x 768 pixels in size and are in jpeg file format. Our dataset can be downloaded as a 1.85 GB zip file LC25000.zip. After unzipping, the main folder lung_colon_image_set contains two subfolders: colon_image_sets and lung_image_sets.

The subfolder colon_image_sets contains two secondary subfolders: colon_aca subfolder with 5000 images of colon adenocarcinomas and colon_n subfolder with 5000 images of benign colonic tissues.

The subfolder lung_image_sets contains three secondary subfolders: lung_aca subfolder with 5000 images of lung adenocarcinomas, lung_scc subfolder with 5000 images of lung squamous cell carcinomas, and lung_n subfolder with 5000 images of benign lung tissues.

This dataset can be downloaded from the link below:

https://academictorrents.com/details/7a638ed187a6180fd6e464b3666a6ea0499af4af

[BY]

Borkowski AA, Bui MM, Thomas LB, Wilson CP, DeLand LA, Mastorides SM. Lung and Colon Cancer Histopathological Image Dataset (LC25000). arXiv:1912.12142v1 [eess.IV], 2019

https://arxiv.org/abs/1912.12142v1

<img width="1024" height="512" alt="image" src="https://github.com/user-attachments/assets/e99fe7d7-f689-49a6-a4ed-270d9d6820c6" />

---

# 🧪 **Models Tested**

| Model                        | Accuracy | F1 Score | Notes                             |
| ---------------------------- | -------- | -------- | --------------------------------- |
| EfficientNet-B0              | 99.12%   | 0.989    | Excellent local texture detection |
| Vision Transformer (ViT-B16) | 98.82%   | 0.985    | Best global reasoning             |
| DenseNet121                  | 97%      | 0.973    | Deep CNN baseline                 |
| ConvNeXt-Tiny                | 96.7%    | 0.964    | Strong CNN backbone               |
| MobileNetV3                  | 95%      | 0.948    | Lightweight model                 |
| ResNet34                     | 93%      | 0.91     | Underperformed                    |

---

# 🧬 **Why Hybrid Model?**

CNNs (EfficientNet) → **Local features**:
• Cell edges
• Nuclei textures
• Tissue patterns

Transformers (ViT) → **Global features**:
• Long-range dependencies
• Structure-level reasoning

Hybrid = **Best performance** on test dataset.

---

# 🏆 **Final Hybrid Model Results**

| Metric          | Score   |
| --------------- | ------- |
| **Accuracy**    | 99.93%  |
| **Precision**   | 100%    |
| **Recall**      | 99.19%  |
| **F1 Score**    | 99.59%  |
| **Specificity** | 100%    |
| **ROC-AUC**     | 0.99999 |

---

# 📉 **ML Results (Add All Graph Images Here)**

### 🔵 Model Compression (key matrics)

<img width="1090" height="490" alt="image" src="https://github.com/user-attachments/assets/a298c7cf-8910-4e85-ad1f-1f876b472890" />


### 🔵 Accuracy and F1 ranked

<img width="889" height="340" alt="image" src="https://github.com/user-attachments/assets/031aa106-2daa-47a2-92e4-bec9f8503cef" />

### 🟢 Precision-Recall Curve

<img width="536" height="547" alt="image" src="https://github.com/user-attachments/assets/9109cf22-5bba-484d-a01e-ee4fdfa950c2" />


### 🔴 Confusion Matrix

<img width="471" height="413" alt="image" src="https://github.com/user-attachments/assets/855b018d-3b76-450b-8f19-c50084b4027b" />


### 🟣 ROC Curve

<img width="536" height="547" alt="image" src="https://github.com/user-attachments/assets/4d5723e3-56ea-4bd3-bebd-249eb6e39951" />


# 🌐 **Web Application Overview**

The solution includes a fully functional **full-stack web app**:

---

# 🖥️ **Frontend UI Screenshots (Placeholders)**

Add your images here.

### 🏠 Home Page

<img width="1919" height="855" alt="image" src="https://github.com/user-attachments/assets/0d834b39-e8a0-4d48-8df6-499c449fe91f" />

### 🩻 Prediction Page (Upload Image)

<img width="1919" height="856" alt="image" src="https://github.com/user-attachments/assets/5f1651d1-4d34-4729-bdb5-053ef214ccd4" />

### 📊 Prediction Result + Confidence Score

<img width="1917" height="862" alt="image" src="https://github.com/user-attachments/assets/c081f7dd-c742-41bf-a617-332ad174a687" />


### 🔥 Grad-CAM Visualization

<img width="1915" height="853" alt="image" src="https://github.com/user-attachments/assets/d83b43c2-e4d4-41c1-ba28-678e5ae9e9b0" />
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/0a25de36-a7f8-43c0-ad5d-a14571954969" />

### 🔍 Patient Details Table

<img width="1916" height="864" alt="image" src="https://github.com/user-attachments/assets/bbf84d41-ddfc-4922-8713-120b8bae3dd5" />

---

# 📁 **Project Structure**

```
project/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── inspect_model.py
│   ├── model/
│   │   ├── model_loader.py
│   │   ├── gradcam.py
│   │   └── (model weights not included)
│   └── utils/
│       └── preprocess.py
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/api.js
    │   └── main.jsx
    ├── package.json
    ├── index.html
    └── vite.config.js
```

---

# ⚙️ **Installation Guide**

## 🔧 **Backend Setup (FastAPI)**

### 1️⃣ Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 2️⃣ Run backend server

```bash
cd backend
uvicorn main:app --reload
```

Runs at:

➡ **[http://127.0.0.1:51362](http:127.0.0.1:51362)**
➡ Swagger Docs: **[http://127.0.0.1:51362 - "GET /patients HTTP/1.1"](127.0.0.1:51362 - "GET /patients HTTP/1.1")**

---

## 🌐 **Frontend Setup (React)**

### 1️⃣ Install dependencies:

```bash
cd frontend
npm install
```

### 2️⃣ Start development server:

```bash
npm run dev
```

Frontend runs at:

➡ **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

---

# 🔥 **How to Use the Web App**

1. Start backend + frontend
2. Open frontend in browser
3. Go to **Predict** tab
4. Upload histopathology image
5. View:

   * Class prediction
   * Confidence %
   * Grad-CAM heatmap
6. Save result to patient database
7. View all results under **Patients**

---

# 🛠️ **Model Placement**

Put your model in:

```
backend/model/
```

Example:

* `hybrid_model.pth`
* `efficientnet_best.pth`

Make sure the filename matches `model_loader.py` configuration.

---

# 📚 **Research Contribution**

This system delivers:

* Novel **Hybrid CNN + Transformer** architecture
* Real-time web application for diagnostics
* Explainable AI with Grad-CAM
* High-accuracy performance on LC25000
* Clean modular full-stack implementation

---

# 🎯 **Conclusion**

This is a complete AI-powered cancer detection system with:

✔ A powerful hybrid model
✔ A medical-style web interface
✔ End-to-end deployment pipeline
✔ Explainable AI insights

It serves as a strong foundation for building **future diagnostic platforms**.

---


