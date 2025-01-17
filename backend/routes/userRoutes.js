const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { updateUserName } = require('../controllers/userController');
const {updateUserPassword} = require('../controllers/userController');
const { updateUserProfilePicture } = require("../controllers/userController");
const {updateFaceCount} = require('../controllers/userController');

// Endpoint to update user name
router.put('/change-username', requireAuth, updateUserName);

// Endpoint to update user password
router.put('/change-password', requireAuth, updateUserPassword);

// Endpoint to update profile picture
router.put("/profile-picture", updateUserProfilePicture);

// Endpoint to update face count
router.post('/update-face-count',updateFaceCount);

module.exports = router;