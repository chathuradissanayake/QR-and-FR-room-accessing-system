const express = require('express');
const router = express.Router();
const { getAllDoors, getDoorByCode } = require('../controllers/doorController');
const requireAuth = require('../middleware/authMiddleware'); // Import the middleware

// Endpoint to get all doors
router.get('/doors', requireAuth, getAllDoors); // Apply the middleware

// Endpoint to get door details by door code
router.get('/:doorCode', getDoorByCode); // Apply the middleware

module.exports = router;