const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  iv: { type: String, required: true },
  ciphertext: { type: String, required: true }
});

// Migration function for existing records
imageSchema.statics.migrateOldRecords = async function() {
  const oldFormatRecords = await this.find({ encryptedData: { $exists: true } });
  for (const record of oldFormatRecords) {
    const [iv, ciphertext] = record.encryptedData.split(':');
    if (iv && ciphertext) {
      await this.updateOne(
        { _id: record._id },
        { $set: { iv, ciphertext }, $unset: { encryptedData: 1 } }
      );
    }
  }
};

module.exports = mongoose.model('Image', imageSchema);
