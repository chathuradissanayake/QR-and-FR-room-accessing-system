const contactUs = require('../models/contactUs');

// Controller function to handle posting a contact message
const postContactUs = async (req, res) => {
  try {
    const {userId, message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a valid string' });
    }
    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and Message are required' });
      }

    // Save the message to the database
    const contactUsDB = await contactUs.create({ userId, message });

    // Respond with the created record
    return res.status(201).json({
      success: true,
      data: contactUsDB,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  postContactUs,
};
