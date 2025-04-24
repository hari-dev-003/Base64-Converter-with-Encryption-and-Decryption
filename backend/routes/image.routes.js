const express = require('express');
const { encryptImage, decryptImage } = require('../controllers/image.controllers');
const router = express.Router();

router.post('/encrypt', encryptImage);
router.get('/decrypt/:id', decryptImage);

router.get('/encrypted/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const imageRecord = await Image.findById(id);
    if (!imageRecord) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json({
      encryptedData: imageRecord.iv + ':' + imageRecord.ciphertext,
      message: 'Encrypted data retrieval successful'
    });
  } catch (err) {
    console.error('Error retrieving encrypted data:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to retrieve encrypted data'
    });
  }
});

module.exports = router;
