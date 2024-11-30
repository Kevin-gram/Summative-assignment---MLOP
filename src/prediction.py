import pandas as pd
from tensorflow.keras.models import load_model

def load_model(filepath):
    return load_model(filepath)

def make_prediction(model, input_data):
    input_df = pd.DataFrame([input_data])
    prediction = model.predict(input_df)
    prediction_binary = (prediction > 0.5).astype(int)
    return int(prediction_binary[0][0])