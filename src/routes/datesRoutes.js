const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//@Route    GET api/dates
//@desc     Test route
//@access   Public
router.get('/', async (req, res) => {
    try {
        const dates = await Book.find();
        if(dates){
            return res.json({msg: 'No data to show.'})
        }
        return res.json(dates);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;