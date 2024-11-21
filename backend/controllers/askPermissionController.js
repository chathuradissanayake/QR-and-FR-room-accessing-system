const Permision = require('../models/askPermision');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Ask Permission
const AskPermission = async (req, res) => {
  try {
    const { name, roomName, doorCode, date, inTime, outTime, message } = req.body;

    // Extract the token from the request (either from cookies or authorization header)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode the token to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Check if the name already exists (optional: adjust as needed)
    const exist = await Permision.findOne({ name });
    if (exist) {
      return res.json({
        error: 'Name is already taken',
      });
    }

    // Create a permission request, include the userId
    const permission = await Permision.create({
      userId,  // Add the logged-in user's userId
      name,
      roomName,
      doorCode,
      date,
      inTime,
      outTime,
      message,
    });

    return res.json(permission);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `The ${field} is already in use` });
    }
    console.log(error);
    res.status(500).json({ error: 'Error Ask Permission' });
  }
};

// Get Permission for Logged-in User
const getPermissions = async (req, res) => {
  try {
    // Get the token from cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Decode the token to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch permissions only for the logged-in user
    const permissions = await Permision.find({ userId });

    if (permissions.length === 0) {
      return res.status(404).json({ message: 'No permissions found for the user' });
    }

    // Send the permissions data back to the client
    return res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

module.exports = {
  AskPermission,
  getPermissions, // Export the new function
};
