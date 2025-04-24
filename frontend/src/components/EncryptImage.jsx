import React, { useState } from 'react';
import axios from 'axios';

function EncryptImage() {
  let [imageData, setImageData] = useState('');
  const [encryptedCode, setEncryptedCode] = useState('');
  const [decryptedCode, setDecryptedCode] = useState('');
  const [imageId, setImageId] = useState('');

  const handleEncrypt = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/images/encrypt', { imageData: imageData });
      console.log('Response:', response.data);
      setImageId(response.data.id);
      setEncryptedCode(''); // Clear previous encrypted code
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleGetEncrypted = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/images/encrypted/${imageId}`);
      console.log('Encrypted Response:', response.data);
      setEncryptedCode(response.data.encryptedData);
    } catch (error) {
      console.error('Error getting encrypted data:', error.message);
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/images/decrypt/${imageId}`);
      console.log('Decrypted Response:', response.data);
      setDecryptedCode(response.data.imageData);
    } catch (error) {
      console.error('Error decrypting data:', error.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encryptedCode);
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
      <button onClick={handleEncrypt}>Encrypt</button>
      {imageId && <button onClick={handleGetEncrypted}>Get Encrypted Code</button>}

      {encryptedCode && (
        <div>
          <p>Encrypted Code: {encryptedCode}</p>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}

      {encryptedCode && (
        <div>
          <h2>Decrypt Image</h2>
          <button onClick={handleDecrypt}>Decrypt</button>
          {decryptedCode && <textarea
              readOnly
              value={decryptedCode}
              rows="4"
              cols="50"
            />}
        </div>
      )}
    </div>
  );
}

export default EncryptImage;
