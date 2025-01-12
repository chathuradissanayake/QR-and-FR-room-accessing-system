const Door = require('../models/door');

// Get all doors
const getAllDoors = async (req, res) => {
  try {
    const companyId = req.user.company._id; 
    const doors = await Door.find({ company: companyId });
    res.json(doors);
  } catch (error) {
    console.error('Error fetching doors:', error);
    res.status(500).json({ error: 'Error fetching doors' });
  }
};

// Get door details by door code
const getDoorByCode = async (req, res) => {
  try {
    const { doorCode } = req.params;
    const door = await Door.findOne({ doorCode }).populate('approvedUsers');
    if (!door) {
      return res.status(404).json({ error: 'Door not found' });
    }
    res.json(door);
  } catch (error) {
    console.error('Error fetching door details:', error);
    res.status(500).json({ error: 'Error fetching door details' });
  }
};

module.exports = {
  getAllDoors,
  getDoorByCode,
};