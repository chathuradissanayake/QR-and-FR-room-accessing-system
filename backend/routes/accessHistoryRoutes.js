const express = require('express');
const router = express.Router();
const { addEntryTime, addExitTime } = require('../controllers/accessHistoryController');

router.post('/entry', addEntryTime); // Route to add entry time
// router.post('/exit', addExitTime);   // Route to add exit time

module.exports = router;


