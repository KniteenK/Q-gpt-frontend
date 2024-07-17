import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
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
        </Routes>
    </Router>
  );
}

export default App;
