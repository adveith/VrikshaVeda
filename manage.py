import os
import shutil

# Define the base path for your dataset
base_path = 'C:\Users\advei\Downloads\dataset.zip\PlantVillage'  # Change this to the path where you have downloaded the images

# Define the structure for the dataset
categories = [
    'tomato/healthy', 'tomato/early_blight', 'tomato/late_blight',
    'potato/healthy', 'potato/early_blight', 'potato/late_blight',
    # Add more plants and diseases here as needed
]

# Create directories for each category
for category in categories:
    category_path = os.path.join(base_path, 'train', category)
    if not os.path.exists(category_path):
        os.makedirs(category_path)
        print(f"Created directory: {category_path}")

# Example of how to move files into categories
def move_images_to_category(src_dir, dest_dir, plant, disease):
    """
    Move images from the source directory to the respective category folder.
    """
    for file_name in os.listdir(src_dir):
        if file_name.lower().endswith(('jpg', 'jpeg', 'png')):  # Filter for image files
            src_file = os.path.join(src_dir, file_name)
            # Here you could add logic to determine the class based on the filename or metadata
            dest_category = f"{plant}/{disease}"
            dest_path = os.path.join(base_path, 'train', dest_category)
            shutil.move(src_file, os.path.join(dest_path, file_name))
            print(f"Moved {file_name} to {dest_category}")

# Assuming you have your images in one folder initially, move them
move_images_to_category(os.path.join(base_path, 'images'), base_path, 'tomato', 'early_blight')
# You can loop through other plants and diseases similarly
