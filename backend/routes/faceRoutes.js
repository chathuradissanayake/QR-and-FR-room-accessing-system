const express = require('express');
const router = express.Router();
const { saveFaceImage } = require('../controllers/faceController');

// POST request to save face image
router.post('/save-face-image', saveFaceImage);

module.exports = router;
