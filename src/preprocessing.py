import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Load the scaler if it exists, otherwise create a new one
scaler_path = 'notebook/scaler.pkl'
if os.path.exists(scaler_path):
    scaler = joblib.load(scaler_path)
else:
    scaler = StandardScaler()

def preprocess_data(data):
    df = pd.DataFrame([data])
    df_scaled = scaler.transform(df)
    return df_scaled