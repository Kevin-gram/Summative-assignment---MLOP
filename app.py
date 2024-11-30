from flask import Flask, request, jsonify
import pandas as pd
from src.model import build_model, train_model, save_model, load_existing_model
from src.prediction import make_prediction
from src.preprocessing import preprocess_data

app = Flask(__name__)

# Load the existing model or build a new one
try:
    model = load_existing_model('diabetes_prediction_model.h5')
except:
    model = build_model((8,))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    prediction = make_prediction(model, data)
    return jsonify({'prediction': prediction})

@app.route('/retrain', methods=['POST'])
def retrain():
    data = request.get_json(force=True)
    df = pd.DataFrame(data)
    x_train = preprocess_data(df.drop('Outcome', axis=1))
    y_train = df['Outcome']
    model = train_model(model, x_train, y_train)
    save_model(model, 'diabetes_prediction_model.h5')
    return jsonify({'message': 'Model retrained successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)