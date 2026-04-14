import os
from PIL import Image

def convert_to_webp(root_dir, size_limit_mb=1.0, max_dim=1920):
    size_limit_bytes = size_limit_mb * 1024 * 1024
    count = 0
    total_saved = 0
    processed_files = []

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                file_size = os.path.getsize(file_path)

                if file_size > size_limit_bytes:
                    try:
                        with Image.open(file_path) as img:
                            orig_size = file_size
                            width, height = img.size
                            
                            # Resize if larger than max_dim
                            if width > max_dim or height > max_dim:
                                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                            
                            # Convert and Save as WebP
                            webp_path = os.path.splitext(file_path)[0] + '.webp'
                            img.save(webp_path, 'WEBP', quality=80)
                            
                            new_size = os.path.getsize(webp_path)
                            saved = orig_size - new_size
                            total_saved += saved
                            count += 1
                            processed_files.append((file_path, webp_path))
                            print(f"Converted {file} to WebP: {orig_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB")
                            
                            # Remove original only after successful conversion
                            if os.path.exists(webp_path) and os.path.getsize(webp_path) > 0:
                                os.remove(file_path)
                                
                    except Exception as e:
                        print(f"Error processing {file}: {e}")

    print(f"\nDone! Converted {count} images to WebP. Total space saved: {total_saved/1024/1024:.2f}MB")

if __name__ == "__main__":
    convert_to_webp('public')
