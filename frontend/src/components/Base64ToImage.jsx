import React, { useState } from 'react';

function Base64ToImage() {
  const [base64String, setBase64String] = useState('');

  const handleInputChange = (event) => {
    setBase64String(event.target.value);
  };

  return (
    <>
    <div className='Base64-align'>
      <h2>Display Image from Base64</h2>
      <input
        type="text-field"
        placeholder="Enter Base64 String"
        value={base64String}
        onChange={handleInputChange}
        style={{ width: '300px', height: '50px', marginBottom: '20px' }}
      />
      
      <div>
      {base64String && <img src={base64String} alt="Base64 Image" />}
      </div>
     
    </div>

    </>
  );
}

export default Base64ToImage;
