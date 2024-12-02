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
    
    # Preprocess the input data without scaler
    input_data_preprocessed = preprocess_data(data)
    prediction = model.predict(input_data_preprocessed)
    prediction_binary = (prediction > 0.5).astype(int)
    
    return jsonify({'prediction': int(prediction_binary[0][0])})

@app.route('/retrain', methods=['POST'])
def retrain():
    print(request.files)  # Debugging line to see what files were uploaded
    
    # Check if the request contains the file
    if 'data' not in request.files:  # Use 'data' instead of 'file'
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['data']  # Change 'file' to 'data'
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read the CSV file into a pandas DataFrame
        df = pd.read_csv(file)
    except Exception as e:
        return jsonify({'error': f'Error reading CSV file: {str(e)}'}), 400
    
    # Check if the 'Outcome' column exists
    if 'Outcome' not in df.columns:
        return jsonify({'error': 'Missing target column "Outcome" in the dataset'}), 400
    
    # Prepare the training data
    x_train = df.drop('Outcome', axis=1)
    y_train = df['Outcome']
    
    # Load the existing model
    model_path = './notebook/diabetes_model.keras'
    if os.path.exists(model_path):
        try:
            model = load_model(model_path)
        except Exception as e:
            return jsonify({'error': f"Error loading model: {e}"}), 500
    else:
        return jsonify({'error': 'Model not found'}), 404
    
    # Retrain the model
    try:
        model.fit(x_train, y_train, epochs=20, batch_size=32, validation_split=0.2)
        # Save the retrained model
        model.save(model_path)
        return jsonify({'message': 'Model retrained successfully'}), 200
    except Exception as e:
        return jsonify({'error': f"Error retraining model: {e}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
