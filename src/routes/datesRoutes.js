const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const Schedule = require('../models/Schedule');
const moment = require('moment');
const Consulting = require('../models/Consulting');
const tokenValidation = require('../libs/verifyToken');

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/', async(req, res) => {
    try {
        const books = await Book.find({consulting_room: 'C1'}).sort({createdAt: -1}).populate('doctor_id').populate('patient_id');
        return res.json(books);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/:consultingroom', async(req, res) => {
    try {
        const books = await Book.find({consulting_room: req.params.consultingroom}).sort({createdAt: -1}).populate('patient_id').populate('doctor_id');
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
            return res.json({msg: 'No hay datos para mostrar.'})
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
            return res.json({msg: 'No hay datos para mostrar.'})
        }
        return res.json(date);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.get('/consult/userLoged/:userId', async(req, res) => {
    try {
        const dates = await Book.find({patient_id: req.params.userId}).populate('patient_id').populate('doctor_id');
        return res.json(dates);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.post('/consult/doctorLoged', async(req, res) => {
    try {
        const dates = await Book.find({doctor_id: req.body.id}).sort({createdAt: -1}).populate('patient_id').populate('doctor_id');
        return res.json(dates);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.post('/', async(req, res) => {

    // Verificamos que el usuario no pueda crear mas de una cita al dia
    const cantidadDeCitas = await Book.find({patient_id: req.body.patient_id, date: req.body.dateForSearch});
    if(cantidadDeCitas.length > 0){
        return res.status(400).json({msg: 'Solo puedes crear una consulta para el mismo dia.'})
    }

    // Verificamos si la hora a registrar es valida
    if(req.body.hour === '08:00' || req.body.hour === "11:00" || req.body.hour === '13:00' || req.body.hour === '15:00'){
        try {
            const {dateForSearch, hour, patient_id, especiality, doctor_id} = req.body;
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
            
            //
            
              const consultorios = await Consulting.find({especiality: especiality});
                const consultoriosDisponible = await Promise.all(Object.values(consultorios).map(
                    async (consultorio) => {
                        const consultorioDisponible = await Book.find({consulting_room: consultorio.code, date: dateForSearch, hour: hour});
                        if(req.body.hour === '08:00' || req.body.hour === '13:00' || req.body.hour === '15:00'){
                            if(consultorioDisponible.length <= 3){
                                var algooo = [];
                                algooo.push(consultorio.code)
                            }
                        }
                        if(req.body.hour === "11:00"){
                            if(consultorioDisponible.length <= 1){
                                var algooo = [];
                                algooo.push(consultorio.code)
                            }
                        }
                        return algooo;
                    }
                ));
                var consultorioss = consultoriosDisponible.sort((a,b) => a.length - b.length);

                if(consultoriosDisponible[0] === undefined){
                    return res.status(400).json({msg: 'No hay consultorios.'})
                }

            //   
            
            // Buscamos los doctores disponibles
            const doctors = await User.find({role: "doctor"});
            const doctorsId = doctors.map(async function(doctor) {
                const numeroDeCitasPorDoctor = await Book.find({doctor_id: doctor._id});
                return algo = numeroDeCitasPorDoctor.length;
            });

            // Buscando la ultima hora guardada para aumentarla
            const book = await Book.findOne({date: req.body.dateForSearch,consulting_room: consultoriosDisponible[0][0], hour: req.body.hour}).sort({createdAt: -1});
            if(book){
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
                consulting_room: consultoriosDisponible[0][0],
                possible_hour: possible,
                especiality
            });
            if(doctor_id != ''){
                Object.assign(
                    newBook, {doctor_id}
                );
            }
            const bookSaved = await newBook.save();
            res.json(bookSaved);
        } catch (err) {
            console.error(err.menssage);
            return res.status(500).send('Server error');
        }
    }else{
        console.log(req.body.hour)
        return res.status(400).json({msg: 'Los datos ingresados son incorrectos o alterados.'})
    }
    
});

router.post('/consulting', async(req, res) => {
    try {
        const book = await Book.find({date: req.body.dateForSearch, especiality: req.body.especiality});
        const rooms = await Consulting.find({especiality: req.body.especiality});
        const {day} = req.body;
        let dayToConsult;
        if ( day ===  4) dayToConsult = '01';
        if ( day ===  5) dayToConsult = '02';
        if ( day ===  6) dayToConsult = '03';
        if ( day ===  7) dayToConsult = '04';
        if ( day ===  8) dayToConsult = '05';
        var doctors = [];
        if ( req.body.admin === true ) {
            const schedules = await Schedule.find({day: dayToConsult});
            await Promise.all(Object.values(schedules).map(async (item) => {
                const books = await Book.find({doctor_id: item.doctor_id, date: req.body.dateForSearch});
                if (books.length < 17) {
                    const doctor = await User.findOne({_id: item.doctor_id});
                    doctors.push(doctor);
                }
            }));
        }
        return res.json({book,rooms, doctors});
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

router.put('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.json({msg: 'Cita no encontrada.'})
        }
        const {doctor} = req.body;
        const bookToEdit = {
            doctor_id:doctor
        };
        const bookUpdated = await Book.findByIdAndUpdate(req.params.id, bookToEdit, {new: true}).populate('doctor_id');
        res.json(bookUpdated);
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

router.put('/check/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.json({msg: 'Cita no encontrada.'})
        }
        const bookToEdit = {
            complete: 'si'
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
            return res.json({msg: 'Cita no existe.'})
        }
        const bookUpdated = await Book.findByIdAndDelete(req.params.id);
        res.json(bookUpdated);
    } catch (err) {
        console.error(err.menssage);
        return res.status(500).send('Server error');
    }
});

module.exports = router;