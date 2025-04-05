import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

def create_model():
    # Load the pre-trained MobileNetV2 model
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    # Add custom layers on top for plant disease classification
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    predictions = Dense(38, activation='softmax')(x)  # Adjust the number of classes as needed

    model = Model(inputs=base_model.input, outputs=predictions)

    # Freeze the base model layers
    for layer in base_model.layers:
        layer.trainable = False

    model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])

    return model

def train_model():
    # Data Augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255, 
        rotation_range=20, 
        width_shift_range=0.2, 
        height_shift_range=0.2, 
        shear_range=0.2, 
        zoom_range=0.2, 
        horizontal_flip=True, 
        fill_mode='nearest'
    )

    val_datagen = ImageDataGenerator(rescale=1./255)

    # Load train and validation datasets
    train_generator = train_datagen.flow_from_directory(
        'data/train',  # Update with the correct path
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    validation_generator = val_datagen.flow_from_directory(
        'data/validation',  # Update with the correct path
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    # Create the model
    model = create_model()

    # Train the model
    model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // 32,
        epochs=10,  # Adjust the number of epochs
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // 32
    )

    # Save the trained model
    model.save('backend/model/model.h5')

    print("Model training completed and saved as model.h5")

if __name__ == "__main__":
    train_model()
