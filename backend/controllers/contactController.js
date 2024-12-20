const ContactUs = require('../models/contactUs');
const User = require("../models/user");

const postContactUs = async (req, res) => {
  const { message, user } = req.body;

  try {
    const newMessage = new ContactUs({
      message,
      user: {
        objId: user.objId,
        userId: user.userId, // Ensure you're passing a valid userId string
      },
    });

    await newMessage.save();
    return res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error sending message.' });
  }
};

const getContactUsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Query the database with userId (correct schema reference)
    const contactUsData = await ContactUs.find({ 'user.userId': userId });

    // If no data is found, return 404
    if (!contactUsData || contactUsData.length === 0) {
      return res.status(404).json({ message: "No contact data found for this user." });
    }

    res.status(200).json(contactUsData);
  } catch (error) {
    console.error("Error fetching contact us data:", error);  // Log the error to console for debugging
    res.status(500).json({ message: "Server error while fetching data." });
  }
};

module.exports = {
  postContactUs, getContactUsByUser,
};
