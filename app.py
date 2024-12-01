from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import StandardScaler
import os
import logging

app = FastAPI()

# Enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Define a function to build the model (if needed)
def build_model(input_shape):
    model = Sequential()
    model.add(Dense(32, activation='relu', input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation='sigmoid'))
    model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Define a function to preprocess the data
def preprocess_data(data, scaler=None):
    df = pd.DataFrame([data])
    if scaler:
        df_scaled = scaler.transform(df)
    else:
        df_scaled = df
    return df_scaled

@app.post("/predict")
async def predict(data: dict):
    model = load_model('notebook/diabetes_prediction_model.h5')
    try:
        # Preprocess the input data without scaler
        input_data_preprocessed = preprocess_data(data)
        prediction = model.predict(input_data_preprocessed)
        prediction_binary = (prediction > 0.5).astype(int)
        return JSONResponse(content={'prediction': int(prediction_binary[0][0])})
    except Exception as e:
        logging.error(f"Error making prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/retrain")
async def retrain(file: UploadFile = File(...)):
    print('===========================')
    print(file.filename)  # Debugging line to see what files were uploaded
    
    if file.filename == '':
        raise HTTPException(status_code=400, detail="No selected file")

    try:
        # Read the CSV file into a pandas DataFrame
        df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading CSV file: {str(e)}")
    
    # Check if the 'Outcome' column exists
    if 'Outcome' not in df.columns:
        raise HTTPException(status_code=400, detail='Missing target column "Outcome" in the dataset')
    
    # Prepare the training data
    x_train = df.drop('Outcome', axis=1)
    y_train = df['Outcome']
    
    # Load the existing model
    model_path = './notebook/diabetes_model.keras'
    if os.path.exists(model_path):
        try:
            model = load_model(model_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error loading model: {e}")
    else:
        raise HTTPException(status_code=404, detail='Model not found')
    
    # Retrain the model
    try:
        model.fit(x_train, y_train, epochs=20, batch_size=32, validation_split=0.2)
        # Save the retrained model
        model.save(model_path)
        return JSONResponse(content={'message': 'Model retrained successfully'})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retraining model: {e}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000)