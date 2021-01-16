const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    /*patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },*/
    /*doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },*/
    date:{
        type: Date,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    consulting_room:{
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = Book = mongoose.model('book', BookSchema);