const Door = require('../models/door');

// Get all doors
const getAllDoors = async (req, res) => {
  try {
    const doors = await Door.find();
    res.json(doors);
  } catch (error) {
    console.error('Error fetching doors:', error);
    res.status(500).json({ error: 'Error fetching doors' });
  }
};

module.exports = {
  getAllDoors,
};