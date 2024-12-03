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

// Update Profile Picture
const updateUserProfilePicture = async (req, res) => {
  const { userId, profilePicture } = req.body;

  if (!userId || !profilePicture) {
    return res.status(400).json({ message: "User ID and profile picture are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = profilePicture; // Update the profilePicture field
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  updateUserName,
  updateUserPassword, 
  updateUserProfilePicture,
};