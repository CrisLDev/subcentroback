const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const moment = require('moment');
const Consulting = require('../models/Consulting');

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/', async(req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1}).populate('patient_id');
        return res.json(books);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.json({msg: 'No data to show.'})
        }
        return res.json(book);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.get('/consult/:code', async(req, res) => {
    try {
        const date = await Book.findOne({code: req.params.code});
        if(!date){
            return res.json({msg: 'No data to show.'})
        }
        return res.json(date);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.post('/', async(req, res) => {
    // Verificamos si la hora a registrar es valida
    if(req.body.hour === '09:00' || req.body.hour === "11:00" || req.body.hour === '13:00' || req.body.hour === '15:00'){
        try {
            const {dateForSearch, hour, patient_id, consulting_room, especiality} = req.body;
            // Creamos el codigo para la cita
            function makeCode(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            // Buscamos los doctores disponibles
            const doctors = await User.find({role: "doctor"});
            const doctorsId = doctors.map(async function(doctor) {
                const numeroDeCitasPorDoctor = await Book.find({doctor_id: doctor._id});
                //if(numeroDeCitasPorDoctor.length < 5){
                //    return console.log(numeroDeCitasPorDoctor.length)
                //}
                return algo = numeroDeCitasPorDoctor.length;
            });
            // Buscando la ultima hora guardada para aumentarla
            const book = await Book.findOne({date: req.body.dateForSearch, hour: req.body.hour}).sort({createdAt: -1});
            if(book){/*
                function addMinutes(time, minsToAdd) {
                    function D(J){ return (J<10? '0':'') + J;};
                    var piece = time.split(':');
                    var mins = piece[0]*60 + +piece[1] + +minsToAdd;
    
                    console.log(mins)
                  
                    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
                }
                var possible = addMinutes(book.hour, '30');*/
                const fecha = book.date + ' ' + book.possible_hour;
                const date = moment(fecha);
                date.add(30, 'm');
                const fechaR = date.toString();
                const hora = fechaR.split(' ')[4];
                var possible = hora;
            }else{
                var possible = hour;
            }
            // aqui termina esta weada
            const newBook = new Book({
                date: dateForSearch,
                code: makeCode(10),
                patient_id,
                hour,
                consulting_room,
                possible_hour: possible,
                especiality
            });
            const bookSaved = await newBook.save();
            res.json(bookSaved);
        } catch (err) {
            console.error(err.menssage);
            return res.status(500).send('Server error');
        }
    }else{
        console.log(req.body.hour)
        return res.status(400).json({msg: 'No me cambie los datos no sea animal.'})
    }
    
});

router.post('/consulting', async(req, res) => {
    try {
        const book = await Book.find({date: req.body.dateForSearch, especiality: req.body.especiality, consulting_room: req.body.code});
        return res.json(book);
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

router.put('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.json({msg: 'No data to edit.'})
        }
        const {date, code, consulting_room} = req.body;
        const bookToEdit = {
            date, code, consulting_room
        };
        const bookUpdated = await Book.findByIdAndUpdate(req.params.id, bookToEdit, {new: true});
        res.json(bookUpdated);
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.json({msg: 'No data to delete.'})
        }
        const bookUpdated = await Book.findByIdAndDelete(req.params.id);
        res.json(bookUpdated);
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

module.exports = router;