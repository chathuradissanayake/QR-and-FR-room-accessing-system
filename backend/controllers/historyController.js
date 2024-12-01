const History = require("../models/History");

// Create history (unchanged)
const createHistory = async (req, res) => {
  const { doorCode, createdAt, userId, location, roomName} = req.body;

  if (!doorCode || !createdAt || !userId) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newHistory = new History({
      doorCode,
      entryTime: createdAt,
      user: { userId},
      location,
      roomName,
    });

    await newHistory.save();

    res.status(201).json({ success: true, message: "History saved successfully!" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ success: false, message: "Error saving history." });
  }
};

// Get history for logged-in user
const getHistory = async (req, res) => {
  const userId = req.query.userId; // Expecting userId as a query parameter

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    // Fetch logs only for the logged-in user
    const historyRecords = await History.find({ "user.userId": userId }).sort({ entryTime: -1 });
    res.status(200).json(historyRecords);
  } catch (error) {
    console.error("Error fetching history records:", error);
    res.status(500).json({ success: false, message: "Error fetching history records." });
  }
};

module.exports = {
  createHistory,
  getHistory,
};
