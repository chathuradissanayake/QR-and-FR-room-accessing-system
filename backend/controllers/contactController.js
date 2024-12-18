const ContactUs = require('../models/contactUs');
const User = require("../models/user");


const postContactUs = async (req, res) => {
  const { registerId, message, reply, userId, status } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ success: false, message: "Message and userId are required." });
  }

  try {
    // Fetch the user from the database using the provided userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const newContactUs = new ContactUs({
      registerId,
      message,
      reply,
      user: { userId: user._id }, // Use the user's _id
      status: status || 'unread', // Default to 'unread' if not provided
    });

    await newContactUs.save();

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Error saving message." });
  }
};

const getContactUsByUserId = async (req, res) => {
  const userId = req.params.userId; // Expecting userId as a path parameter

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    // Fetch the user from the database using the provided userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Fetch logs only for the logged-in user
    const ContactUsRecords = await ContactUs.find({ "user.userId": user._id });
    res.status(200).json(ContactUsRecords);
  } catch (error) {
    console.error("Error fetching history records:", error);
    res.status(500).json({ success: false, message: "Error fetching records." });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { logId } = req.params;  // Get logId from request params

    // Find the log by ID and update the userstatus to 'read'
    const updatedLog = await ContactUs.findOneAndUpdate(
      { _id: logId },
      { $set: { 'userstatus': 'read' } },
      { new: true } // Return the updated log
    );

    if (!updatedLog) {
      return res.status(404).json({ message: 'Log not found' });
    }

    return res.status(200).json(updatedLog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating userstatus' });
  }
};


module.exports = {
  postContactUs,
  getContactUsByUserId,
  updateUserStatus,
};
