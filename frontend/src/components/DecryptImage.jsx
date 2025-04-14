import React, { useState } from 'react';
import axios from 'axios';

function DecryptImage() {
  const [imageId, setImageId] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const handleDecrypt = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/images/decrypt/${imageId}`);
      setDecryptedData(response.data.imageData);
      alert('Decryption successful!');
    } catch (error) {
      console.error(error);
      alert('Decryption failed!');
    }
  };

  return (
    <div>
      <h2>Decrypt Image</h2>
      <input type="text" onChange={(e) => setImageId(e.target.value)} placeholder="Enter Image ID" />
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedData && <p>Decrypted Data: {decryptedData}</p>}
    </div>
  );
}

export default DecryptImage;
