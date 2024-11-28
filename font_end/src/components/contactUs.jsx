import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const ContactUs = () => {
  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
  const slideIn = useSpring({ from: { transform: 'translateY(100px)' }, to: { transform: 'translateY(0)' }, delay: 400 });

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center p-6 pt-24">
      <animated.div style={fadeIn} className="text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-blue-900 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-800 mb-8">
          We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
        </p>
      </animated.div>
      <animated.div style={slideIn} className="flex flex-col items-center mt-8 space-y-8">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Email:</strong> support@diabetesawareness.com
          </p>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p className="text-lg text-gray-800 mb-2">
            <strong>Address:</strong> 123 Diabetes Awareness St, Health City, Wellness State, 12345
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default ContactUs;