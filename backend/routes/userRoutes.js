const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { updateUserName } = require('../controllers/userController');


// Endpoint to update user name
router.put('/change-username', requireAuth, updateUserName);

module.exports = router;