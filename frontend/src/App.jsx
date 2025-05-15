import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import EncryptImage from './components/EncryptImage';
import Base64ToImage from './components/Base64ToImage';
import ConvertBase64 from './components/ConvertToBase64';
import DecryptImage from './components/DecryptImage'
;
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/encrypt">Encrypt Image</Link>
            </li>
            <li>
              <Link to="/decrypt">Decrypt Image</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/encrypt" />} />
          <Route path="/encrypt" element={<ConvertBase64/>} />
          <Route path="/decrypt" element={<DecryptImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
