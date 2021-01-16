const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    day:{
        type: String,
        required: true
    }
});

module.exports = Book = mongoose.model('book', BookSchema);