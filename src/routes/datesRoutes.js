const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/', async(req, res) => {
    try {
        const books = await Book.find();
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
    try {
        const {date, code, consulting_room} = req.body;
        const newBook = new Book({
            date, code, consulting_room
        });
        const bookSaved = await newBook.save();
        res.json(bookSaved);
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