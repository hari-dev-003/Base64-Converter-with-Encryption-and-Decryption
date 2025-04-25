import React, { useState } from 'react';
import axios from 'axios';

function DecryptImage() {
  const [imageId, setImageId] = useState('');
  const [imageName, setImageName] = useState('');
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');

  const handleIdChange = (event) => {
    setImageId(event.target.value);
  };

  const handleNameChange = (event) => {
    setImageName(event.target.value);
  };

  const fetchImageById = async () => {
    try {
      setError('');
      const response = await axios.get("http://localhost:5000/api/images/decrypt/" + imageId);
      setBase64String(response.data.imageData);
    } catch (err) {
      setError('Failed to fetch image by ID. Please check the ID and try again.');
      setBase64String('');
    }
  };

  const fetchImageByName = async () => {
    try {
      setError('');
      const response = await axios.get("http://localhost:5000/api/images/decryptByName/" + encodeURIComponent(imageName));
      setBase64String(response.data.imageData);
    } catch (err) {
      setError('Failed to fetch image by name. Please check the name and try again.');
      setBase64String('');
    }
  };

  return (
    <div>
      <h2>Decrypt Image</h2>
      <div>
        <h3>Fetch by ID</h3>
        <input
          type="text"
          placeholder="Enter Image ID"
          value={imageId}
          onChange={handleIdChange}
        />
        <button onClick={fetchImageById}>Fetch Image by ID</button>
      </div>
      <div>
        <h3>Fetch by Name</h3>
        <input
          type="text"
          placeholder="Enter Image Name"
          value={imageName}
          onChange={handleNameChange}
        />
        <button onClick={fetchImageByName}>Fetch Image by Name</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {base64String && <img src={base64String} alt="Decrypted" />}
    </div>
  );
}

export default DecryptImage;
