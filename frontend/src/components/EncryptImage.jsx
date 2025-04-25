import React, { useState } from 'react';
import axios from 'axios';

function EncryptImage() {
  let [imageData, setImageData] = useState('');
  let [imageName, setImageName] = useState('');

  const handleEncrypt = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/images/save', {
        imageData: imageData,
        imageName: imageName
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Encrypt Image</h2>
      <textarea
        onChange={(e) => setImageData(e.target.value)}
        placeholder="Paste your image data here"
        rows="4"
        cols="50"
      />
      <input
        type="text"
        placeholder="Image Name"
        onChange={(e) => setImageName(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt</button>
    </div>
  );
}

export default EncryptImage;
