const express = require('express');
const router = express.Router();
const { postContactUs } = require('../controllers/contactController');

// post Message
router.post('/messages', postContactUs);



module.exports = router;