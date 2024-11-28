const express = require('express');
const router = express.Router();
const { getAllDoors,getDoorByCode } = require('../controllers/doorController');

// Endpoint to get all doors
router.get('/doors', getAllDoors);

// Endpoint to get door details by door code
router.get('/:doorCode', getDoorByCode);

module.exports = router;