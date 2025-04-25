const express = require('express');
const { encryptImage, decryptImage, saveImage, getAllImages, decryptImageByName } = require('../controllers/image.controllers');
const router = express.Router();

router.post('/encrypt', encryptImage);
router.get('/decrypt/:id', decryptImage);
router.get('/decryptByName/:name', decryptImageByName);
router.post('/save', saveImage);
router.get('/', getAllImages);

module.exports = router;
