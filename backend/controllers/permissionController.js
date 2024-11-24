const PermissionRequest = require('../models/permissionRequest');
const User = require('../models/user'); // Ensure you have the User model

// Create a new permission request
const createPermissionRequest = async (req, res) => {
  try {
    const { door, name, roomName, inTime, outTime, date, message } = req.body;
    const userId = req.user._id; // Use the user._id from the request object

    // Fetch the user object from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newRequest = new PermissionRequest({
      user: userId,
      door,
      name,
      roomName,
      inTime,
      outTime,
      date,
      message,
    });

    const savedRequest = await newRequest.save();

    // Update the user's pendingRequests array
    user.pendingRequests.push(savedRequest._id);
    await user.save();

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

// Delete a permission request
const deletePermissionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await PermissionRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ error: 'Permission request not found' });
    }
    res.status(200).json({ message: 'Permission request deleted successfully' });
  } catch (error) {
    console.error('Error deleting permission request:', error);
    res.status(500).json({ error: 'Error deleting permission request' });
  }
};

module.exports = {
  createPermissionRequest,
  getUserPermissionRequests,
  deletePermissionRequest,
};