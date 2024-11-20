const express = require('express');
const router = express.Router();
const cors = require('cors');
const dotenv = require('dotenv').config();
const {loginUser, getProfile, getContactUs } = require('../controllers/authController')
const {AskPermission, getPermissions } = require('../controllers/askPermissionController');
const requireAuth = require('../middleware/authMiddleware');

// middleware
router.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Public routes
router.post('/signin', loginUser);

// Protected routes
router.get('/profile', requireAuth, getProfile);
router.post('/askpermission',requireAuth, AskPermission)
router.post('/contactus',requireAuth, getContactUs)
router.get('/permissions',requireAuth, getPermissions);

module.exports = router;