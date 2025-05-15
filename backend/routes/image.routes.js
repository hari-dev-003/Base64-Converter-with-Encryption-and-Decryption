const express = require('express');
const { encryptImage, decryptImage, saveImage, getAllImages, decryptImageByName, getAllSignatures } = require('../controllers/image.controllers');
const router = express.Router();

router.post('/encrypt', encryptImage);
router.get('/decrypt/:id', decryptImage);
router.get('/decryptByName/:name', decryptImageByName);
router.post('/save', saveImage);
router.get('/', getAllImages);
router.get('/signatures', getAllSignatures);

module.exports = router;
