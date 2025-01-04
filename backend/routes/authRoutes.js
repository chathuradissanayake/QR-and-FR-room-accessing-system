const express = require('express');
const router = express.Router();
const {loginUser, getUserProfile } = require('../controllers/authController')
const requireAuth = require('../middleware/authMiddleware');


// Public routes
router.post('/signin', loginUser);

// Protected routes
router.get('/profile', requireAuth, getUserProfile);

module.exports = router;