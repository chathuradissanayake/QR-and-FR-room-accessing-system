const Time = require('../models/accessHistory');

// Helper function to convert UTC to IST
const convertToIST = (date) => {
  const utcDate = new Date(date); // Parse input to Date object
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  return new Date(utcDate.getTime() + istOffset); // Return IST date object
};

const addEntryTime = async (req, res) => {
  const { entryTime, exitTime } = req.body;

  if (!entryTime) {
    return res
      .status(400)
      .json({ success: false, message: "Entry time is required." });
  }

  try {
    // Convert times to IST
    const istEntryTime = convertToIST(entryTime);
    const istExitTime = exitTime ? convertToIST(exitTime) : null;

    // Log IST times for debugging
    console.log("IST Entry Time:", istEntryTime);
    if (istExitTime) console.log("IST Exit Time:", istExitTime);

    // Create a new Time document
    const newTime = new Time({
      entryTime: istEntryTime,
      exitTime: istExitTime,
    });

    await newTime.save(); // Save to database

    res
      .status(201)
      .json({ success: true, message: "Entry data saved successfully!" });
  } catch (error) {
    console.error("Error saving entry data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving entry data." });
  }
  
};

module.exports = {
  addEntryTime,
};













