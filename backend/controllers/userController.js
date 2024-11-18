const User = require('../models/user');
const {comparePassword, hashPassword } = require('../helper/auth')

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

// Update user password
const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user._id; // Use the user._id from the request object
    const { oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: 'Error updating password' });
  }
};

module.exports = {
  updateUserName,
  updateUserPassword,
};