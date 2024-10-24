const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authController') 

// middleware

router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

router.post('/register', registerUser) 
router.post('/signin', loginUser)
router.get('/profile', getProfile)

module.exports = router;