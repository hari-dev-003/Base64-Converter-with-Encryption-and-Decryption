const Image = require('../models/image.models');

exports.encryptImage = async (req, res) => {
  try {
    const { imageData, imageName } = req.body;

    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({ error: 'Invalid image data' });
    }

    const newImage = new Image({
      imageName: imageName,
      imageData: imageData
    });

    await newImage.save();

    res.status(200).json({
      message: 'Image saved successfully'
    });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to save image'
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

    res.status(200).json({
      imageData: imageRecord.imageData,
      message: 'Image retrieval successful'
    });
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to retrieve image'
    });
  }
};

exports.decryptImageByName = async (req, res) => {
  try {
    const { name } = req.params;

    const imageRecord = await Image.findOne({ imageName: name });
    if (!imageRecord) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({
      imageData: imageRecord.imageData,
      message: 'Image retrieval successful'
    });
  } catch (err) {
    console.error('Error retrieving image by name:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to retrieve image by name'
    });
  }
};

exports.saveImage = async (req, res) => {
  try {
    const { imageData, imageName } = req.body;

    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({ error: 'Invalid image data' });
    }

    if (!imageName || typeof imageName !== 'string') {
      return res.status(400).json({ error: 'Invalid image name' });
    }

    const newImage = new Image({
      imageName: imageName,
      imageData: imageData
    });

    await newImage.save();

    res.status(200).json({
      message: 'Image saved successfully'
    });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to save image'
    });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    console.error('Error getting images:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to get images'
    });
  }
};

exports.getAllSignatures = async (req, res) => {
  try {
    const signatures = await Image.find({}, '_id imageName');
    res.status(200).json(signatures);
  } catch (err) {
    console.error('Error getting signatures:', err);
    res.status(500).json({
      error: err.message,
      details: 'Failed to get signatures'
    });
  }
};
