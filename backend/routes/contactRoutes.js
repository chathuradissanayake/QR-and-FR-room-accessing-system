const express = require('express');
const router = express.Router();
const { postContactUs, getContactUsByUser } = require('../controllers/contactController');

// Post message
router.post('/messages', postContactUs);

// Get messages by userId
router.get('/user/:userId', getContactUsByUser);

module.exports = router;
