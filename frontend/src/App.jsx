import React from 'react';
import EncryptImage from './components/EncryptImage';
import DecryptImage from './components/DecryptImage';
import ConvertToBase64 from './components/ConvertToBase64';

function App() {
  return (
    <div>
      <h1>Image Encryption App</h1>
      <EncryptImage />
      <DecryptImage />
      <ConvertToBase64 />
    </div>
  );
}

export default App;
