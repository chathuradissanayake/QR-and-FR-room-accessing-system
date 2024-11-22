const PermissionRequest = require('../models/permissionRequest');

// Create a new permission request
const createPermissionRequest = async (req, res) => {
  try {
    const { door, name, roomName, inTime, outTime, date, message } = req.body;
    const user = req.user._id; // Use the user._id from the request object

    const newRequest = new PermissionRequest({
      user,
      door,
      name,
      roomName,
      inTime,
      outTime,
      date,
      message,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating permission request:', error); // Log the error to the console
    res.status(500).json({ error: 'Error creating permission request' });
  }
};

// Get all permission requests for the logged-in user
const getUserPermissionRequests = async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user's ID
    console.log('Fetching permission requests for user:', userId);
    const requests = await PermissionRequest.find({ user: userId }).populate('door');
    console.log('Permission requests found:', requests);
    res.json(requests);
  } catch (error) {
    console.error('Error fetching user permission requests:', error); // Log the error to the console
    res.status(500).json({ error: 'Error fetching user permission requests' });
  }
};

module.exports = {
  createPermissionRequest,
  getUserPermissionRequests,
};