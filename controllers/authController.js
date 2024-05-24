const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        const isExistingUser = await User.findOne({email});

        if(isExistingUser){
            return res.status(200).json({
                success:false,
                msg: 'Email already exists'
            });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email, 
            password:hashedPwd
        });

        const userData = await user.save();

        return res.status(200).json({
            success:true,
            msg: 'Registered Successfully!',
            data:userData
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            msg: error.message
        });
    }
}

const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "2h" });
    return token;
}

const loginUser = async(req, res) => {
    try{
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const userData = await User.findOne({email});

        if(!userData){
            return res.status(400).json({
                success:false,
                msg:'Email or Password is incorrect!'
            });
        }

        const isPassword = await bcrypt.compare(password, userData.password);

        if(!isPassword){
            return res.status(400).json({
                success:false,
                msg:'Email or Password is incorrect!'
            });
        }

        const accessToken = await generateAccessToken({user: userData});

        return res.status(200).json({
            success:200,
            msg:'Successfully logged in!',
            accessToken,
            tokenType:'Bearer',
            data:userData
        })


    }catch(error){
        return res.status(400).json({
            success:false,
            msg: error.message
        });
    }
}

const getProfile = async(req, res) => {
    try{

        return res.status(200).json({
            success:true,
            msg:"User profile",
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}