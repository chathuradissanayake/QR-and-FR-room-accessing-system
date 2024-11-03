const express = require('express');
const router = express.Router();
const cors = require('cors');
const dotenv = require('dotenv').config();
const {registerUser, loginUser, getProfile } = require('../controllers/authController') 
const requireAuth = require('../middleware/authMiddleware');

// middleware
router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Public routes
router.post('/register', registerUser);
router.post('/signin', loginUser);

// Protected routes
router.get('/profile', requireAuth, getProfile);

module.exports = router;