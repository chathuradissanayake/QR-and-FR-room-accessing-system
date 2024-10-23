const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser } = require('../controllers/authController') 

// middleware

router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

router.post('/register', registerUser) 
router.post('/signin', loginUser)

module.exports = router;