const Image = require('../models/image.models');
const { encrypt, decrypt } = require('../index'); // Import encryption functions

exports.encryptImage = async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({ error: 'Invalid image data' });
    }

    const encryptedData = encrypt(imageData);
    const [iv, ciphertext] = encryptedData.split(':');

    const newImage = await Image.create({ iv, ciphertext });

    res.status(200).json({
      id: newImage._id
    });
  } catch (err) {
    console.error('Encryption error:', err);
    res.status(500).json({
      error: err.message,
      details: 'Encryption failed'
    });
  }
};

exports.decryptImage = async (req, res) => {
  try {
    const { id } = req.params;

    const imageRecord = await Image.findById(id);
    if (!imageRecord) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const encryptedData = imageRecord.iv + ':' + imageRecord.ciphertext;
    const imageData = decrypt(encryptedData);

    res.status(200).json({
      imageData: imageData,
      message: 'Decryption successful'
    });
  } catch (err) {
    console.error('Decryption error:', err);
    res.status(500).json({
      error: err.message,
      details: 'Decryption failed'
    });
  }
};
