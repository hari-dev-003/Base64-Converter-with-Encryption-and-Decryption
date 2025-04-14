const express = require('express');
const { encryptImage, decryptImage } = require('../controllers/image.controllers');
const router = express.Router();

router.post('/encrypt', encryptImage);
router.get('/decrypt/:id', decryptImage);

module.exports = router;
