import React, { useState, useEffect } from "react";
import axios from "axios";

function DecryptImage() {
  const [imageId, setImageId] = useState("");
  const [imageName, setImageName] = useState("");
  const [base64String, setBase64String] = useState("");
  const [error, setError] = useState("");
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images/signatures");
        setSignatures(response.data);
      } catch (error) {
        console.error("Error fetching signatures:", error);
      }
    };

    fetchSignatures();
  }, []);

  const handleIdChange = (event) => {
    setImageId(event.target.value);
  };

  const handleNameChange = (event) => {
    setImageName(event.target.value);
  };

  const fetchImageById = async () => {
    try {
      setError("");
      const response = await axios.get(
        "http://localhost:5000/api/images/decrypt/" + imageId
      );
      setBase64String(response.data.imageData);
    } catch (err) {
      setError(
        "Failed to fetch image by ID. Please check the ID and try again."
      );
      setBase64String("");
    }
  };

  const fetchImageByName = async () => {
    try {
      setError("");
      const response = await axios.get(
        "http://localhost:5000/api/images/decryptByName/" +
        encodeURIComponent(imageName)
      );
      setBase64String(response.data.imageData);
    } catch (err) {
      setError(
        "Failed to fetch image by name. Please check the name and try again."
      );
      setBase64String("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Decrypt Signature using Name or ID of the signature</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <h3>Signatures</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {signatures.map((signature) => (
                <tr key={signature._id}>
                  <td>{signature._id}</td>
                  <td>{signature.imageName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Fetch by ID</h3>
          <input
            type="text"
            placeholder="Enter Image ID"
            value={imageId}
            onChange={handleIdChange}
          />
          <button onClick={fetchImageById}>Fetch Image by ID</button>
          <h3>Fetch by Name</h3>
          <input
            type="text"
            placeholder="Enter Image Name"
            value={imageName}
            onChange={handleNameChange}
          />
          <button onClick={fetchImageByName}>Fetch Image by Name</button>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {base64String && <img src={base64String} alt="Decrypted" />}
    </div>
  );
}

export default DecryptImage;
