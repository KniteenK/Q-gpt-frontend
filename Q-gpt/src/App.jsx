import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import './index.css';

function App() {
  // console.log("Hello");
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}
        </Routes>
    </Router>
  );
}

export default App;
