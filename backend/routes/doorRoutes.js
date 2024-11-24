const express = require('express');
const router = express.Router();
const { getAllDoors } = require('../controllers/doorController');

// Endpoint to get all doors
router.get('/doors', getAllDoors);

module.exports = router;