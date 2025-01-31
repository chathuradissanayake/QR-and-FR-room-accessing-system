const express = require('express');
const router = express.Router();
const { postContactUs, getContactUsByUser, updateNotificationStatus } = require('../controllers/contactController');

// Post message
router.post('/messages', postContactUs);

// Get messages by userId
router.get('/user/:userId', getContactUsByUser);

// Update notification status
router.put('/notifications/:id', updateNotificationStatus);

module.exports = router;
