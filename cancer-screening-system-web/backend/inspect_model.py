import torch

try:
    path = "model/efficientnet_best.pth"
    print(f"Inspecting {path}...")
    
    # Load raw file
    content = torch.load(path, map_location="cpu")
    
    if isinstance(content, dict):
        print("\n[INFO] File is a State Dictionary (Weights only).")
        print("Keys found:", list(content.keys())[:5]) # Print first 5 keys
        if "state_dict" in content:
            print("[INFO] Note: Weights are nested under 'state_dict' key.")
    else:
        print("\n[INFO] File is a Full Model Object.")
        print(type(content))

except Exception as e:
    print(f"Error: {e}")