const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { updateUserName } = require('../controllers/userController');
const {updateUserPassword} = require('../controllers/userController')

// Endpoint to update user name
router.put('/change-username', requireAuth, updateUserName);

// Endpoint to update user password
router.put('/change-password', requireAuth, updateUserPassword);

module.exports = router;