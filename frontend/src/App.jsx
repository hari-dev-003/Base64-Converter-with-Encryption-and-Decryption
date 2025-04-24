import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import EncryptImage from './components/EncryptImage';
import ConvertToBase64 from "./components/ConvertToBase64"
import Base64ToImage from './components/Base64ToImage';
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
              <Link to="/base64">Base64 to Image</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/encrypt" />} />
          <Route path="/encrypt" element={<ConvertToBase64/>} />
          <Route path="/base64" element={<Base64ToImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
