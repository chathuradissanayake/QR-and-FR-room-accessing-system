const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { createPermissionRequest, getUserPermissionRequests, deletePermissionRequest } = require('../controllers/permissionController');

// Endpoint to create a new permission request
router.post('/ask-permission', requireAuth, createPermissionRequest);

// Endpoint to get all permission requests for the logged-in user
router.get('/my-requests', requireAuth, getUserPermissionRequests);

// Endpoint to delete a permission request
router.delete('/delete-permission/:id', requireAuth, deletePermissionRequest);

module.exports = router;