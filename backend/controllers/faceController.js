const UserModel = require("../models/user"); // Import the user model
const mongoose = require("mongoose"); // Import mongoose

/**
 * Controller to save face image for a user
 */
const saveFaceImage = async (req, res) => {
  try {
    const { userId, faceImage } = req.body;

    // Convert userId to ObjectId using 'new'
    const objectId = new mongoose.Types.ObjectId(userId); // Ensure 'new' is used here

    const updatedUser = await UserModel.findByIdAndUpdate(
      objectId,
      { faceImage },
      { new: true }
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ success: true, message: "Face image saved successfully." });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error saving face image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = { saveFaceImage };
