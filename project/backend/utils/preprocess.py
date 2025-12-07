import torchvision.transforms as transforms
from PIL import Image

def get_transforms():
    """
    Standard ImageNet normalization and resizing for EfficientNet.
    """
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

def preprocess_image(image_bytes):
    """Opens image bytes and applies transforms."""
    img = Image.open(image_bytes).convert("RGB")
    transform = get_transforms()
    return transform(img).unsqueeze(0)  # Add batch dimension
