const User = require('../models/user');
const { comparePassword } = require('../helper/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const contactUs = require('../models/contactUs');
// ContactUs
const getContactUs = async (req, res) => {

  try {
    const { message } = req.body;

    // Create in database
    const contactUsDB = await contactUs.create({
      message,
    });

    return res.json(contactUsDB);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error sending message' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No User Found',
      });
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, name: user.firstName }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });

      const user = await User.findById(decoded.userId).select('-password');
      res.json(user);
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  loginUser,
  getProfile,
  getContactUs,
};