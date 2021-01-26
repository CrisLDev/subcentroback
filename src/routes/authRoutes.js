const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Hash Password for security my bro
const hashPasswords = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

// Validating password bro
const validatePassword = async (password, passwordFromRequest) => {
    return await bcrypt.compare(password, passwordFromRequest)
}

router.post('/register', async(req, res) => {
    try {
        const {userName, email, password} = req.body;
        // Check if user already exist
        const userByNameExist = await User.findOne({userName});
        
        if(userByNameExist){
            return res.status(400).json({msg: 'Username already exist.'})
        }
        const userByEmailExist = await User.findOne({email});
        if(userByEmailExist){
            return res.status(400).json({msg: 'Email already was taken.'})
        }
        const newUser = new User({
            userName, email, password
        });
        newUser.password = await hashPasswords(password);
        const userSaved = await newUser.save();
        res.json(userSaved);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

module.exports = router;