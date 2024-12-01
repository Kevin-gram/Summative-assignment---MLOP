from flask import Flask, request, jsonify
import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import StandardScaler
import os
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    model = load_model('notebook/diabetes_prediction_model.h5')
    try:
        # Preprocess the input data without scaler
        input_data_preprocessed = preprocess_data(data)
        prediction = model.predict(input_data_preprocessed)
        prediction_binary = (prediction > 0.5).astype(int)
        return jsonify({'prediction': int(prediction_binary[0][0])})
    except Exception as e:
        app.logger.error(f"Error making prediction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/retrain', methods=['POST'])
def retrain():
    data = request.get_json(force=True)
    df = pd.DataFrame(data)
    x_train = df.drop('Outcome', axis=1)
    y_train = df['Outcome']
    
    # Fit the scaler with the training data
    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    
    try:
        model = load_model('notebook/diabetes_prediction_model.h5')
    except Exception as e:
        app.logger.warning(f"Model file not found, building a new model: {e}")
        model = build_model((8,))
    try:
        model.fit(x_train_scaled, y_train, epochs=100, batch_size=32, validation_split=0.2)
        model.save('notebook/diabetes_prediction_model.h5')
        return jsonify({'message': 'Model retrained successfully'})
    except Exception as e:
        app.logger.error(f"Error retraining model: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)