const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('No token found');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    console.log('User authenticated:', user);
    next();
  } catch (error) {
    console.log('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;