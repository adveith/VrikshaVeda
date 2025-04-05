from flask import Flask, request, jsonify, render_template
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load your pretrained AI model
model = tf.keras.models.load_model('model/model.h5')  # Adjust path if needed

# Function to preprocess the image and predict the disease
def preprocess_image(image):
    img = image.resize((224, 224))  # Resize to match model input size
    img_array = np.array(img) / 255.0  # Normalize
    return np.expand_dims(img_array, axis=0)  # Add batch dimension

# Route for rendering the landing page (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route for handling image upload and AI prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    # Open the image and predict
    img = Image.open(file)
    processed_img = preprocess_image(img)
    prediction = model.predict(processed_img)
    
    # Example of how to get the prediction
    disease_names = ['Healthy', 'Diseased1', 'Diseased2']  # Replace with actual class names
    predicted_class = disease_names[np.argmax(prediction)]
    
    # Example treatments
    treatments = {
        'Diseased1': 'Use pesticide X.',
        'Diseased2': 'Fertilizer Y is recommended.',
        'Healthy': 'No treatment required.',
    }
    treatment = treatments.get(predicted_class, 'No treatment available.')
    
    return jsonify({"prediction": predicted_class, "treatment": treatment})

if __name__ == '__main__':
    app.run(debug=True)
