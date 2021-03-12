const express = require('express');
const router = express.Router();
const Especiality = require('../models/Especiality');
const Consulting = require('../models/Consulting');
const Book = require('../models/Book');

router.post('/', async(req, res) => {
    try {
        const {name} = req.body;
        // Check if user already exist
        const especialityNameExist = await Especiality.findOne({name});
        
        if(especialityNameExist){
            return res.status(400).json({msg: 'Especiality already exist.'})
        }
        const newEspeciality = new Especiality({
            name
        });
        const especialitySave = await newEspeciality.save();
        return res.json(especialitySave);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/', async(req, res) => {
    try {
        const especialityExists = await Especiality.find().sort({createdAt: -1});
        return res.json(especialityExists);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const especiality = await Especiality.findById(req.params.id);
        return res.json(especiality);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const {name} = req.body;
        const especialityExist = await Especiality.findOne({name: req.body.name});
        if(especialityExist._id != req.params.id){
            return res.status(400).json({msg: 'Especialidad ya existe.'})
        }
        const especialityToEdit = ({
            name
        });
        const especialityEdited = await Especiality.findByIdAndUpdate(req.params.id, especialityToEdit, {new: true});
        return res.status(200).json(especialityEdited);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const especiality = await Especiality.findByIdAndRemove(req.params.id);
        const consulting = await Consulting.deleteMany({especiality: especiality.name});
        await Book.deleteMany({especiality: especiality.name});
        //Check is username is correct
        if(!especiality){
            return res.status(400).json({msg: 'Consulting dont exist in bd.'})
        }
        return res.json(especiality)
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

module.exports = router;