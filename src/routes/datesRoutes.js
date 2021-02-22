const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

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

router.post('/', async(req, res) => {
    if(req.body.hour === '09:00' || req.body.hour === "11:00" || req.body.hour === '13:00' || req.body.hour === '15:00'){
        try {
            const {dateForSearch, hour, patient_id, consulting_room} = req.body;
            function makeCode(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            const doctors = await User.find({role: "doctor"});
            const doctorsId = doctors.map(async function(doctor) {
                const numeroDeCitasPorDoctor = await Book.find({doctor_id: doctor._id});
                //if(numeroDeCitasPorDoctor.length < 5){
                //    return console.log(numeroDeCitasPorDoctor.length)
                //}
                return algo = numeroDeCitasPorDoctor.length;
            });
            const newBook = new Book({
                date: dateForSearch,
                code: makeCode(10),
                patient_id,
                hour,
                consulting_room
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
        const book = await Book.find({date: req.body.dateForSearch});
        if(book.length <= 0){
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