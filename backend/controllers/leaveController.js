// controllers/leaveController.js
const Leave = require('../models/Leave');
const moment = require('moment-timezone'); // For handling timezones

exports.confirmLeave = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Get the current time in Sri Lanka Standard Time (Asia/Colombo)
        const leaveTime = moment.tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss'); // Format as string

        // Create a new leave entry in the database
        const newLeave = new Leave({
            userId,
            leaveTime, // Store as formatted string
        });

        // Save the leave information to the database
        await newLeave.save();

        // Respond with success
        res.status(200).json({ message: 'Leave confirmed successfully', data: newLeave });
    } catch (error) {
        console.error('Error confirming leave:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
