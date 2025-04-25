const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const imageRoutes = require('./routes/image.routes');
const crypto = require('crypto');

dotenv.config();

const app = express();
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex'); // Use SECRET_KEY from env or generate a random one
const IV_LENGTH = 16;

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

exports.decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

app.use(express.json({ limit: '10mb' })); // Increase from default 100kb
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/images', imageRoutes);

mongoose.connect('mongodb+srv://dbUser:root@digital-signature-syste.iamvikh.mongodb.net/?retryWrites=true&w=majority&appName=digital-signature-system', {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
