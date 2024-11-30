import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const PredictForm = () => {
  const [formData, setFormData] = useState({
    sex: '',
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();here
    // Handle form submission logic 
    console.log(formData);
  };

  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideIn = useSpring({ from: { transform: 'translateY(100px)' }, to: { transform: 'translateY(0)' }, delay: 400 });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4 pt-16 overflow-hidden">
      <animated.div style={fadeIn} className="text-center bg-white bg-opacity-75 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-semibold text-blue-900 mb-4">Predict Your Sugar Level</h1>
        <p className="text-lg text-gray-800 mb-6">
          Enter your details below to predict your sugar level.
        </p>
      </animated.div>
      <animated.div style={slideIn} className="flex flex-col items-center mt-6 space-y-6 w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="w-full bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Sex:</label>
              <select name="sex" value={formData.sex} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Pregnancies:</label>
              <input type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Glucose:</label>
              <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Blood Pressure:</label>
              <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Skin Thickness:</label>
              <input type="number" name="skinThickness" value={formData.skinThickness} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Insulin:</label>
              <input type="number" name="insulin" value={formData.insulin} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">BMI:</label>
              <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Diabetes Pedigree Function:</label>
              <input type="number" step="0.01" name="diabetesPedigreeFunction" value={formData.diabetesPedigreeFunction} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1">Age:</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700" />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition-transform transform hover:scale-105">
            Predict
          </button>
        </form>
      </animated.div>
    </div>
  );
};

export default PredictForm;