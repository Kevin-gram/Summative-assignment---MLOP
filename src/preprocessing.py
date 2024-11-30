import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(df):
    # Example preprocessing steps
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df)
    return pd.DataFrame(df_scaled, columns=df.columns)

def load_and_preprocess_data(filepath):
    df = pd.read_csv(filepath)
    df_processed = preprocess_data(df)
    return df_processed