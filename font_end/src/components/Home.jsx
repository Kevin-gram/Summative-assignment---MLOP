import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import homepageImage from '../assets/homepage.jpg'; // Adjust the path if necessary

const Home = () => {
  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideIn = useSpring({ from: { transform: 'translateY(100px)' }, to: { transform: 'translateY(0)' }, delay: 400 });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center p-6 pt-24">
      <animated.div style={fadeIn} className="flex flex-col md:flex-row items-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <img src={homepageImage} alt="Diabetes Awareness" className="rounded-lg shadow-lg w-full md:w-1/2 mb-8 md:mb-0 md:mr-8" />
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Welcome to Diabetes Awareness</h1>
          <p className="text-xl text-gray-700 mb-8">
            Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy.
            There isn’t a cure yet for diabetes, but losing weight, eating healthy food, and being active can really help.
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/predict" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105">
              Check Your Diabetes Risk
            </Link>
            <Link to="/about" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105">
              Learn More About Us
            </Link>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Home;