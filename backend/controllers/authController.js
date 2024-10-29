const User = require('../models/user')
const {comparePassword, hashPassword} = require('../helper/auth')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Register User
const registerUser = async (req,res) =>{
    try {
        const {name, email, password} = req.body

    // check name 
    if(!name){
        return res.json({
            error: 'Name is required'
    })
    };

    // check email
    const exist = await User.findOne({email});
    if(exist){
        return res.json({
            error: 'Email is already taken'
        })
    }

    // check password
    if(!password || password.length < 6){
        return res.json({
            error: 'Password is required and should be min 6 characters long'
    })
    };

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user in database
    const user = await User.create({
        name,
        email,
        password : hashedPassword ,
    }) 
    return res.json(user)
        
    } catch (error) {
        console.log(error)
    }

}

// Login User
const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;

    // check user exist
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            error: 'No User Found'
        })
    }

    // Compare the password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
}

const getProfile = async (req,res) =>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,{}, (err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    loginUser,
    registerUser,
    getProfile
}
