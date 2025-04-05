from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image
import os

app = Flask(__name__)

# Load the pre-trained model from TensorFlow Hub
model_url = "https://tfhub.dev/google/inaturalist/efficientnetv2-l/feature-vector/2"
model = hub.KerasLayer(model_url)

# Folder to save uploaded images
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Prepare the image for prediction
def prepare_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))  # Resize image to match model input size
    img_array = np.array(img) / 255.0  # Normalize the image
    return np.expand_dims(img_array, axis=0)

# Predict disease using the model
def predict_disease(image_path):
    image = prepare_image(image_path)
    prediction = model(image)
    return prediction

@app.route('/')
def index():
    return render_template('index.html')

# Handle image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the uploaded image
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Predict the disease
    prediction = predict_disease(file_path)

    # Return the prediction result (for simplicity, assuming it's a class index)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Assuming the model has multiple classes
    return jsonify({'prediction': str(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)
