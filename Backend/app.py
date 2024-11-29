from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load your trained model
model = joblib.load('../models/_model_name.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # Convert data into DataFrame or appropriate format for prediction
    input_data = pd.DataFrame([data])
    prediction = model.predict(input_data)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)