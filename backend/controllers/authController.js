const User = require('../models/user')
const {comparePassword, hashPassword} = require('../helper/auth')
const jwt = require('jsonwebtoken');


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
            error: 'Email is taken'
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

    // check password
    const match = await comparePassword(password, user.password);
    if(match){
        jwt.sign({email : user.email , id: user._id, name: user.name }, process.env.JWT_SECRET,{},(err,token) =>{
            if(err) throw err;
            res.cookie('token', token).json(user)
        })
    }
    } catch (error) {
        console.log(error)
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
