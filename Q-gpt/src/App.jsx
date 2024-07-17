import React from 'react';
import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // console.log("Hello");
  return(
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
    </Router>
  );
}

export default App;
