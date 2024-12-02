Diabetes Prediction and Retraining API
=======================================

Video Presentation
----------------------
Watch the video presentation of this project:  
[Diabetes Prediction and Retraining API Presentation](https://youtu.be/dbtDOZCpxx8)

Badges
------
- Diabetes Prediction
- Flask 2.0.1
- TensorFlow 2.6.0
Table of Contents
-----------------
1. Project Description
2. Features
3. Front-End Setup Instructions
4. Backend Setup Instructions
5. Docker Setup
6. Usage
7. API Endpoints
8. Model Retraining Capability
9. Contributing
10. License
11. Contact

Project Description
-------------------
A cutting-edge RESTful API for diabetes prediction with dynamic model retraining capabilities. 
The system allows continuous improvement of the predictive model by incorporating new datasets.

Key Innovation: Dynamic Model Adaptation
----------------------------------------
The API features a unique retraining mechanism that enables:
* Continuous model improvement
* Adaptation to new medical data
* Enhanced prediction accuracy over time

Features
--------
* Real-time Diabetes Risk Prediction
* Dynamic Model Retraining
* Automatic Learning from New Datasets
* CORS Enabled
* Comprehensive Logging

Front-End Setup Instructions
-------------------------------
This project also includes a front-end web interface for users to interact with the API easily. The front-end allows users to submit medical data for diabetes risk prediction and upload new datasets for model retraining.

Prerequisites:
1. **Node.js** and **npm** installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).

Steps to Set Up the Front-End:
1. Clone the Front-End Repository:
   git clone https://github.com/yourusername/diabetes-frontend.git

2. Install Dependencies:
   Navigate to the front-end directory and install the required dependencies:
   cd diabetes-frontend
   npm install

3. Run the Front-End:
   Start the front-end server:
   npm start
   This will launch the website on http://localhost:3000, where you can interact with the back-end API.

4. Connect Front-End to the API:
   The front-end is set to communicate with the back-end API running at http://localhost:5000. Ensure the API is running before using the front-end.

Backend Setup Instructions
------------------------------
The backend API is built using Flask and TensorFlow. It provides endpoints for diabetes risk prediction and model retraining.

Prerequisites:
1. **Python 3.x** installed on your machine.
2. Install required dependencies:
   pip install -r requirements.txt

Steps to Set Up the Backend:
1. Clone the Backend Repository:
   git clone https://github.com/yourusername/diabetes-backend.git

2. Start the Backend Server:
   Navigate to the backend directory and start the Flask application:
   cd diabetes-backend
   python app.py
   This will start the API on http://localhost:5000.

Docker Setup
-------------
To run the Diabetes Prediction and Retraining API in a Docker container, use the following Docker image:

Docker Image:  
`docker pull kevinny2k/diabetes-prediction-app:latest`

Steps to Run with Docker:
1. Pull the Docker image:
docker pull kevinny2k/diabetes-prediction-app:latest

markdown
Copy code

2. Run the Docker container:
docker run -d -p 5000:5000 kevinny2k/diabetes-prediction-app:latest

markdown
Copy code

This will start the API inside the Docker container and expose it on port 5000.

Usage
---------------
1. Initial Prediction:
- Use the existing trained model
- Predict diabetes risk using the /predict endpoint.

2. Model Enhancement:
- Collect new patient data.
- Upload the dataset via the /retrain endpoint to retrain the model.

API Endpoints
-------------
/predict (POST)
- Predict diabetes risk
- Input: JSON with medical parameters
- Output: Prediction probability

/retrain (POST)
- Retrain model with new dataset
- Input: Comprehensive medical CSV
- Output: Retraining status and model performance metrics

Model Retraining Capability
--------------------------
Unique Retraining Process:
* Upload new medical dataset via API
* Automatically retrain the neural network
* Improve prediction accuracy without manual intervention
* Preserve previous learning while integrating new insights
* Supports incremental learning and model evolution

How Retraining Works:
- Receive new CSV dataset
- Validate and preprocess data
- Retrain neural network model
- Update model weights
- Generate new predictive model
- Automatically replace existing model

Technical Specifications
-----------------------
Neural Network Architecture:
* Adaptive input layer
* Multiple dense layers
* Dropout for preventing overfitting
* Sigmoid output for risk probability
* Adam optimizer
* Binary cross-entropy loss function

Contributing
------------
Help Improve the Model:
1. Fork repository
2. Create feature branch
3. Contribute new datasets
4. Enhance retraining logic
5. Submit pull request

License
--------
MIT License - Open for innovation and collaboration

Contact & Collaboration
----------------------
- **Name**: Kevin Nyiringango
- **Email**: k.nyiringan@alustudent.com
- **GitHub**: kevin-gram

Disclaimer: 
- Machine learning model for research purposes
- Not a substitute for professional medical advice
- Always consult healthcare professionals
