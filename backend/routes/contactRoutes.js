const express = require('express');
const router = express.Router();
const { postContactUs } = require('../controllers/contactController');
const { getContactUsByUserId, updateUserStatus } = require('../controllers/contactController');

// post message
router.post('/messages', postContactUs);
// get message
router.get('/user/:userId', getContactUsByUserId);
router.put('/userstatus/:logId', updateUserStatus);

module.exports = router;