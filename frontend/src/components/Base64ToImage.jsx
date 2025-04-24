import React, { useState } from 'react';

function Base64ToImage() {
  const [base64String, setBase64String] = useState('');

  const handleInputChange = (event) => {
    setBase64String(event.target.value);
  };

  return (
    <div>
      <h2>Display Image from Base64</h2>
      <input
        type="text"
        placeholder="Enter Base64 String"
        value={base64String}
        onChange={handleInputChange}
      />
      {base64String && <img src={base64String} alt="Base64 Image" />}
    </div>
  );
}

export default Base64ToImage;
