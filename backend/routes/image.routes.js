const express = require('express');
const { encryptImage, decryptImage, saveImage, getAllImages } = require('../controllers/image.controllers');
const router = express.Router();

router.post('/encrypt', encryptImage);
router.get('/decrypt/:id', decryptImage);
router.post('/save', saveImage);
router.get('/', getAllImages);

module.exports = router;
