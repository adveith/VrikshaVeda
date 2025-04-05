from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf

app = FastAPI()

# Load your AI model (e.g., a TensorFlow model)
model = tf.keras.models.load_model('path_to_your_model')

# A helper function to process the image and run prediction
def preprocess_image(image: BytesIO):
    img = Image.open(image)
    img = img.resize((224, 224))  # Resize based on model input size
    img_array = np.array(img) / 255.0  # Normalize image
    return np.expand_dims(img_array, axis=0)  # Add batch dimension

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image file
        image_data = await file.read()
        image = BytesIO(image_data)
        processed_image = preprocess_image(image)
        
        # Predict using your model
        prediction = model.predict(processed_image)
        
        # Assume you have a way to map the prediction to a label
        prediction_label = "Healthy" if prediction[0][0] > 0.5 else "Diseased"

        return JSONResponse(content={"prediction": prediction_label})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
