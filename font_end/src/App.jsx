import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PredictForm from './components/PredictForm';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/contactUs';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/predict" element={<PredictForm />} />
      </Routes>
    </Router>
  );
}

export default App;