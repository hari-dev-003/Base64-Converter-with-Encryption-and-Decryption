const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const imageRoutes = require('./routes/image.routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase from default 100kb
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/images', imageRoutes);



mongoose.connect('mongodb+srv://2k23cse053:database@d-signature-system.tedit.mongodb.net/?retryWrites=true&w=majority&appName=D-signature-system')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
