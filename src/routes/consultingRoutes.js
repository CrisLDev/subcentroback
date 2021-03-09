const express = require('express');
const router = express.Router();
const Consulting = require('../models/Consulting');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenValidation = require('../libs/verifyToken');

router.post('/', async(req, res) => {
    try {
        const {name, code, especiality} = req.body;
        // Check if user already exist
        const consultingNameExist = await Consulting.findOne({name});
        
        if(consultingNameExist){
            return res.status(400).json({msg: 'Consulting room already exist.'})
        }
        const newConsulting = new Consulting({
            name, code, especiality
        });
        const consultingSave = await newConsulting.save();
        return res.json(consultingSave);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/', async(req, res) => {
    try {
        const consultingExists = await Consulting.find().sort({createdAt: -1});
        return res.json(consultingExists);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const consultingExists = await Consulting.findById(req.params.id);
        return res.json(consultingExists);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const {name, code, especiality} = req.body;
        const roomExist = await Consulting.findOne({name: req.body.name});
        if(roomExist){
            return res.status(400).json({msg: 'Consultorio ya existe.'})
        }
        const roomToEdit = ({
            name, code, especiality
        });
        const userEdited = await Consulting.findByIdAndUpdate(req.params.id, roomToEdit, {new: true});
        return res.status(200).json(userEdited);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.post('/login', async(req, res) => {
    try {
        const {userName, password} = req.body;
        // Searching for user
        let userExist = await User.findOne({userName});
        //Check is username is correct
        if(!userExist){
            return res.status(400).json({msg: 'Username doesnt exist.'})
        }
        //Validating password
        const isMatch = await bcrypt.compare(password, userExist.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Password is incorrect.'})
        }
        
        const token = jwt.sign({id: userExist.id}, 'rashumulukaska', {expiresIn: 86400});
        let userWithToken = {...userExist._doc};
        const tokenValue = {token: token};
        Object.assign(userWithToken, tokenValue);
        return res.json(userWithToken)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/me', tokenValidation, async(req, res) => {
    try {
        const userExist = await User.findById(req.userId);
        //Check is username is correct
        if(!userExist){
            return res.status(400).json({msg: 'Username doesnt exist.'})
        }
        console.log(userExist)
        return res.json(userExist)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/users', tokenValidation, async(req, res) => {
    try {
        const users = await User.find();
        //Check is username is correct
        if(!users){
            return res.status(400).json({msg: 'Dont have users in bd.'})
        }
        console.log(users)
        return res.json(users)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.delete('/users/:id', tokenValidation, async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        //Check is username is correct
        if(!user){
            return res.status(400).json({msg: 'User dont exist in bd.'})
        }
        console.log(user)
        return res.json(user)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

module.exports = router;