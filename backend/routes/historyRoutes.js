const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { getHistory } = require('../controllers/historyController');

// Route to create a new history
router.post('/add-history', historyController.createHistory);
router.get('/get-history', getHistory);
router.post('/update-exit-time', historyController.updateExitTime);

module.exports = router;


