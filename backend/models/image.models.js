const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: { type: String, required: true },
  imageData: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);
