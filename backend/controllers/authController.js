const User = require('../models/user');
const { comparePassword, hashPassword } = require('../helper/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userId } = req.body;

    // Check name
    if (!firstName || !lastName) {
      return res.json({
        error: 'First name and last name are required',
      });
    }

    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is already taken',
      });
    }

    // Check userId
    const userIdExist = await User.findOne({ userId });
    if (userIdExist) {
      return res.json({
        error: 'User ID is already taken',
      });
    }

    // Check password
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be min 6 characters long',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userId,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error registering user' });
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
  registerUser,
  getProfile,
};