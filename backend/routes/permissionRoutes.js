const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { createPermissionRequest, getUserPermissionRequests } = require('../controllers/permissionController');

// Endpoint to create a new permission request
router.post('/ask-permission', requireAuth, createPermissionRequest);

// Endpoint to get all permission requests for the logged-in user
router.get('/my-requests', requireAuth, getUserPermissionRequests);

module.exports = router;