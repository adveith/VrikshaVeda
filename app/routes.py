import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

# Load the trained model
model = tf.keras.models.load_model('model/model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Preprocess the image
    img = image.load_img(file, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize

    # Predict the class
    preds = model.predict(img_array)
    class_idx = np.argmax(preds[0])  # Get the class index
    return jsonify({'class_index': class_idx, 'predictions': preds.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
