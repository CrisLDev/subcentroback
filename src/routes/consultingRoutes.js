const express = require('express');
const router = express.Router();
const Consulting = require('../models/Consulting');
const Book = require('../models/Book');
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

router.post('/rooms', async(req, res) => {
    try {
        const consultings = await Consulting.find({especiality: req.body.especiality});
        return res.json(consultings);
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

router.delete('/:id', tokenValidation, async(req, res) => {
    try {
        const consulting = await Consulting.findByIdAndRemove(req.params.id);
        await Book.deleteMany({consulting_room: consulting.code});
        //Check is username is correct
        if(!consulting){
            return res.status(400).json({msg: 'Consulting dont exist in bd.'})
        }
        return res.json(consulting)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

module.exports = router;