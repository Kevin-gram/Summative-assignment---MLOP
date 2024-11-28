import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import diabetesImage from '../assets/diabetes-2994808_1280.jpg'; // Adjust the path if necessary

const AboutUs = () => {
  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideIn = useSpring({ from: { transform: 'translateY(100px)' }, to: { transform: 'translateY(0)' }, delay: 400 });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center p-6 pt-24">
      <animated.div style={fadeIn} className="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">About Us</h1>
        <p className="text-xl text-gray-800 mb-8">
          Welcome to Diabetes Awareness! We are dedicated to spreading knowledge and awareness about diabetes. Our mission is to educate, support, and empower individuals to lead healthier lives.
        </p>
      </animated.div>
      <animated.div style={slideIn} className="flex flex-col md:flex-row items-center mt-8 space-y-8 md:space-y-0 md:space-x-8 max-w-6xl w-full">
        <img src={diabetesImage} alt="Diabetes Awareness" className="rounded-lg shadow-lg w-full md:w-1/2" />
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Story</h2>
          <p className="text-lg text-gray-800 mb-4">
            Our journey began with a simple idea: to make diabetes information accessible and engaging for everyone. Our team of experts and enthusiasts came together to create a platform where people can learn, share, and grow.
          </p>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-800">
            We are a diverse group of professionals, including doctors, nutritionists, fitness experts, and tech enthusiasts. We are united by our commitment to improving the lives of those affected by diabetes.
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default AboutUs;