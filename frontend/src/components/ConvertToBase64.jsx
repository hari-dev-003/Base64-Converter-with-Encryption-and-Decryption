import React, { useState } from 'react';
import axios from 'axios';

function ConvertToBase64() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [imageName, setImageName] = useState('');

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

  const saveToDatabase = async () => {
    if (!base64String) {
      alert('No base64 string to save!');
      return;
    }
    if (!imageName) {
      alert('Please enter an image name!');
      return;
    }
    try {
      console.log('Saving to database:', { imageName, base64String });
      const response = await axios.post('http://localhost:5000/api/images/save', {
        imageName: imageName,
        imageData: base64String
      });
      console.log('Save response:', response.data);
      alert('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image!');
    }
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
          <input
            type="text"
            placeholder="Enter Image Name"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
          <button onClick={saveToDatabase}>Save to Database</button>
        </div>
      )}
    </div>
  );
}

export default ConvertToBase64;
