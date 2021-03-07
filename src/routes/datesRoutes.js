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
        if(books.length <= 0){
            return res.json({msg: 'No data to show.'})
        }
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
            var codeRoom;
            // aqui termina esta weada
            // Buscamos un consultorio vacio
            if(consulting_room == ''){
                // Vemos la cantidad de citas que tenemos para el dia y para la misma especialidad
                const consultings = await Book.find({especiality: especiality, date: dateForSearch}).sort({createdAt: -1});
                // Verificamos si entra entre las cantidades de citas permitidas al dia por consultorio
                if(consultings.length >= 1 && consultings.length < 15){
                    // Buscamos los consultorios que contengan la especialidad que se pidio
                    const consultorios = await Consulting.find({especiality: req.body.especiality}).sort({createdAt: -1});
                    // Mapeamos para cambiar la variable a un consultorio permitido
                    const dinero = await Promise.all(Object.values(consultorios).map(async (consultorio) => {
                        // Buscamos la cantidad de consultorios que tienen un mismo codigo
                        const alls = await Book.find({consulting_room: consultorio.code, date: dateForSearch}).sort({createdAt: -1});
                        // Verificamos para que horario es la cita
                        if(req.body.hour === '09:00' || req.body.hour === "11:00" || req.body.hour === '13:00' || req.body.hour === '15:00'){
                            if(alls.length < 15){
                                var alguito = consultorio.code;
                            }else{
                                return res.status(400).json({msg: 'No hay consultorios disponibles'})
                            }
                            var algo = alguito;
                        }
                        var algomas = algo;
                        return algomas
                    }));
                    var codeRoom = dinero[0];
                }else{
                    // Si es el primer registro se otorga un codigo de consultorio random
                    const consultings = await Consulting.find({especiality: req.body.especiality}).sort({createdAt: -1});
                    if(consultings.length <= 0){
                        return res.status(400).json({msg: 'No existen consultorios para esta especialidad'})
                    }
                    var codeRoom = consultings[0].code
                }
            }
            const newBook = new Book({
                date: dateForSearch,
                code: makeCode(10),
                patient_id,
                hour,
                consulting_room: codeRoom,
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
        const book = await Book.find({date: req.body.dateForSearch, especiality: req.body.especiality});
        if(book.length <= 0){
            console.log(book)
            return res.json({msg: 'No data to show.'})
        }
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