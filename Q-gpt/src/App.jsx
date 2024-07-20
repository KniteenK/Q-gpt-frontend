import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Chatbot from './components/Chatbot';
import Homepage from './components/Homepage';
import Login from './components/Login';
import './index.css';

function App() {
  // console.log("Hello");
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="/Chatbot" element={<Chatbot />} />
        </Routes>
    </Router>
  );
}

export default App;