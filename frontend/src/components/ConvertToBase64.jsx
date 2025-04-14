import React, { useState } from 'react';

function ConvertToBase64() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const convertToBase64 = () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setBase64String(reader.result);
      alert('Conversion successful!');
    };
    reader.onerror = (error) => {
      console.error('Error converting file:', error);
      alert('Failed to convert file!');
    };
  };

  return (
    <div>
      <h2>Convert Image to Base64</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={convertToBase64}>Convert</button>
      {base64String && (
        <div>
          <h3>Base64 String:</h3>
          <textarea readOnly value={base64String} rows="10" cols="50"></textarea>
        </div>
      )}
    </div>
  );
}

export default ConvertToBase64;
