const User = require('../models/user');

// Update user first name and last name
const updateUserName = async (req, res) => {
  try {
    const userId = req.user._id; // Use the user._id from the request object
    const { firstName, lastName } = req.body;

    const user = await User.findByIdAndUpdate(userId, { firstName, lastName }, { new: true });

    res.json(user);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Error updating user name' });
  }
};


module.exports = {
  updateUserName,
};