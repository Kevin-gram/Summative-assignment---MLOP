import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const PredictForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);
  const [retrainMessage, setRetrainMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data to the console

    // Convert form data to numeric values
    const dataToSend = {
      pregnancies: parseFloat(formData.pregnancies),
      glucose: parseFloat(formData.glucose),
      bloodPressure: parseFloat(formData.bloodPressure),
      skinThickness: parseFloat(formData.skinThickness),
      insulin: parseFloat(formData.insulin),
      bmi: parseFloat(formData.bmi),
      diabetesPedigreeFunction: parseFloat(formData.diabetesPedigreeFunction),
      age: parseFloat(formData.age)
    };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRetrain = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a CSV file.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:5000/retrain', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setRetrainMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideIn = useSpring({ from: { transform: 'translateY(100px)' }, to: { transform: 'translateY(0)' }, delay: 400 });
  const resultFadeIn = useSpring({ opacity: prediction !== null ? 1 : 0, transform: prediction !== null ? 'translateY(0)' : 'translateY(-20px)', delay: 600 });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4 pt-16 overflow-y-auto">
      <animated.div style={fadeIn} className="text-center bg-white bg-opacity-75 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-semibold text-blue-900 mb-4">Predict Your Sugar Level</h1>
        <p className="text-lg text-gray-800 mb-6">
          Enter your details below to predict your sugar level.
        </p>
        {prediction !== null && (
          <animated.div style={resultFadeIn} className="mt-4 p-4 bg-white bg-opacity-75 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-900">Prediction Result:</h2>
            <p className="text-lg text-gray-800">{prediction === 1 ? 'High risk of diabetes' : 'Low risk of diabetes'}</p>
          </animated.div>
        )}
      </animated.div>
      <animated.div style={slideIn} className="flex flex-col md:flex-row items-center mt-6 space-y-6 md:space-y-0 md:space-x-6 w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Pregnancies:</label>
              <input type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Glucose:</label>
              <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Blood Pressure:</label>
              <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Skin Thickness:</label>
              <input type="number" name="skinThickness" value={formData.skinThickness} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Insulin:</label>
              <input type="number" name="insulin" value={formData.insulin} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">BMI:</label>
              <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Diabetes Pedigree Function:</label>
              <input type="number" step="0.01" name="diabetesPedigreeFunction" value={formData.diabetesPedigreeFunction} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition-transform transform hover:scale-105 w-full">
            Predict
          </button>
        </form>
        <form onSubmit={handleRetrain} className="w-full md:w-1/3 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-1">Upload CSV for Retraining:</label>
            <input type="file" accept=".csv" onChange={handleFileChange} className="shadow appearance-none border border-blue-500 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition-transform transform hover:scale-105 w-full">
            Retrain
          </button>
        </form>
        {retrainMessage && (
          <div className="mt-4 p-4 bg-white bg-opacity-75 rounded-lg shadow-lg">
            <p className="text-lg text-gray-800">{retrainMessage}</p>
          </div>
        )}
      </animated.div>
    </div>
  );
};

export default PredictForm;