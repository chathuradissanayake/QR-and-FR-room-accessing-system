const express = require('express');
const router = express.Router();
const {loginUser, getProfile } = require('../controllers/authController')
const requireAuth = require('../middleware/authMiddleware');


// Public routes
router.post('/signin', loginUser);

// Protected routes
router.get('/profile', requireAuth, getProfile);

module.exports = router;