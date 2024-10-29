const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController') 
const requireAuth = require('../middleware/authMiddleware');

// middleware
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Public routes
router.post('/register', registerUser);
router.post('/signin', loginUser);

// Protected routes
router.get('/profile', requireAuth, getProfile);

module.exports = router;