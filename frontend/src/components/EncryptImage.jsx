import React, { useState } from 'react';
import axios from 'axios';

function EncryptImage() {
  let [imageData, setImageData] = useState();
  const [encryptedCode, setEncryptedCode] = useState('');

  const handleEncrypt = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/images/encrypt',
        { imageData: imageData },
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Encrypt Image</h2>
      <textarea onChange={(e) => setImageData(e.target.value)} placeholder="Paste your image data here"></textarea>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedCode && <p>Encrypted Code: {encryptedCode}</p>}
    </div>
  );
}

export default EncryptImage;
