// routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const { confirmLeave } = require('../controllers/leaveController'); // Import the controller function

// Route to mark leave
router.post('/mark', confirmLeave); // Use the controller function to handle the POST request

module.exports = router;
