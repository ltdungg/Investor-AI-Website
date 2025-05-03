import torch

print("="*50)
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"CUDA version: {torch.version.cuda}")
print(f"GPU name: {torch.cuda.get_device_name(0)}")
print("="*50)

if torch.cuda.is_available():
    x = torch.randn(2,3).cuda()
    print(x.device)
else:
    print("CUDA not working!")
