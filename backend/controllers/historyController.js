const History = require("../models/History");
const User = require("../models/user");

// Create history
const createHistory = async (req, res) => {
  const { doorCode, createdAt, userId, location, roomName } = req.body;

  if (!doorCode || !createdAt || !userId) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    console.log("Fetching user with userId:", userId); // Debugging log

    // Fetch the user from the database using the provided userId
    const user = await User.findOne({ userId }).populate('company');
    if (!user) {
      console.log("User not found with userId:", userId); // Debugging log
      return res.status(404).json({ success: false, message: "User not found." });
    }

    console.log("User found:", user); // Debugging log

    if (!user.company) {
      console.log("User does not have a company associated."); // Debugging log
      return res.status(400).json({ success: false, message: "User does not have a company associated." });
    }

    console.log("User's company:", user.company); // Debugging log

    const newHistory = new History({
      doorCode,
      entryTime: createdAt,
      user: user._id, // Use the user's database _id
      location,
      roomName,
      company: user.company._id, // Include the company ID from the user object
    });

    console.log("Saving new history:", newHistory); // Debugging log

    await newHistory.save();

    res.status(201).json({ success: true, message: "History saved successfully!" });
  } catch (error) {
    console.error("Error saving history:", error); // Log the error details
    res.status(500).json({ success: false, message: "Error saving history.", error: error.message });
  }
};

// Update exit time
const updateExitTime = async (req, res) => {
  const { userId, exitTime } = req.body;

  if (!userId || !exitTime) {
    return res.status(400).json({ success: false, message: "User ID and exitTime are required." });
  }

  try {
    // Fetch the user from the database using the provided userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Find the latest entry for the user and update the exitTime
    const updatedHistory = await History.findOneAndUpdate(
      { user: user._id, exitTime: null }, // Match the user ID and ensure exitTime is null
      { $set: { exitTime } }, // Set the new exitTime
      { sort: { entryTime: -1 }, new: true }
    );

    if (!updatedHistory) {
      return res.status(404).json({ success: false, message: "No active history record found." });
    }

    res.status(200).json({ success: true, message: "Exit time updated successfully!", updatedHistory });
  } catch (error) {
    console.error("Error updating exitTime:", error);
    res.status(500).json({ success: false, message: "Error updating exitTime." });
  }
};

const getHistory = async (req, res) => {
  const userId = req.query.userId; // Expecting userId as a query parameter

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    console.log("Fetching user with userId:", userId); // Debugging log

    // Fetch the user from the database using the provided userId
    const user = await User.findOne({ userId });
    if (!user) {
      console.log("User not found with userId:", userId); // Debugging log
      return res.status(404).json({ success: false, message: "User not found." });
    }

    console.log("User found:", user); // Debugging log
    console.log("User's ObjectId:", user._id); // Debugging log

    // Fetch logs only for the logged-in user using the user's ObjectId
    const historyRecords = await History.find({ user: user._id }).sort({ entryTime: -1 });
    console.log("Fetched history records:", historyRecords); // Debugging log

    res.status(200).json(historyRecords);
  } catch (error) {
    console.error("Error fetching history records:", error);
    res.status(500).json({ success: false, message: "Error fetching history records." });
  }
};

module.exports = {
  createHistory,
  getHistory,
  updateExitTime,
};