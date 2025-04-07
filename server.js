require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({ 
  dest: uploadsDir,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

app.post('/remove-bg', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imagePath = req.file.path;
  console.log('Processing image:', imagePath);

  try {
    // Check if file exists and is readable
    if (!fs.existsSync(imagePath)) {
      throw new Error('Uploaded file not found');
    }

    const imageBuffer = fs.readFileSync(imagePath);
    console.log('Image size:', imageBuffer.length, 'bytes');

    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: {
        image_file_b64: imageBuffer.toString('base64'),
        size: 'auto',
        format: 'png'
      },
      responseType: 'arraybuffer',
      headers: {
        'X-Api-Key': 'rPDyq8pQxwhoRkFAnPffzTM8',
        'Content-Type': 'application/json'
      },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Empty response from remove.bg API');
    }

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data.toString()
      } : 'No response data'
    });

    res.status(500).json({ 
      error: 'Failed to remove background',
      details: error.message,
      apiError: error.response ? error.response.data.toString() : 'No API error details'
    });
  } finally {
    // Clean up the uploaded file
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up file:', cleanupError);
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
