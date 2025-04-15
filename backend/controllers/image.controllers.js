const crypto = require('crypto');
const Image = require('../models/image.models');
const dotenv = require('dotenv');
dotenv.config();

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 64; // AES block size in bytes

exports.encryptImage = async (req, res) => {
    try {
        const { imageData } = req.body;
        console.log('Encrypt request received:', req.body);

        // Validate input
        if (!imageData || typeof imageData !== 'string') {
            return res.status(400).json({ error: 'Invalid image data' });
        }

        // Generate random IV for each encryption
        const iv = crypto.randomBytes(IV_LENGTH);
        
       // Check if SECRET_KEY is defined
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined in .env');
        }

        // Convert secret key from hex to Buffer
        const key = Buffer.from(process.env.SECRET_KEY, 'hex');

        // Validate key length (256-bit = 32 bytes)
        if (key.length !== 32) {
            throw new Error('Invalid key length. Must be 256-bit (32 bytes)');
        }

        // Create cipher
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
        
        // Encrypt the data
        let encrypted = cipher.update(imageData, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Save to MongoDB with separate fields
        const newImage = await Image.create({ iv: iv.toString('hex'), ciphertext: encrypted });
        
        res.status(200).json({
            id: newImage._id
        });

    } catch (err) {
        console.error('Encryption error:', err);
        res.status(500).json({ 
            error: err.message,
            details: 'Ensure your SECRET_KEY is 256-bit (64 hex characters) in .env'
        });
    }
};

// Call migration function for existing records
Image.migrateOldRecords();

exports.decryptImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find encrypted record
        const imageRecord = await Image.findById(id);
        if (!imageRecord) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Convert IV from hex to Buffer
        const iv = Buffer.from(imageRecord.iv, 'hex');
        
        // Convert secret key from hex to Buffer
        const key = Buffer.from(process.env.SECRET_KEY, 'hex');

        // Create decipher
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        
        // Decrypt the data
        let decrypted = decipher.update(imageRecord.ciphertext, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        res.status(200).json({ 
            imageData: decrypted,
            message: 'Decryption successful'
        });

    } catch (err) {
        console.error('Decryption error:', err);
        res.status(500).json({ 
            error: err.message,
            details: 'Ensure the encryption key matches and data format is valid'
        });
    }
};
