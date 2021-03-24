const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    date:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    possible_hour:{
        type: String,
        required: true
    },
    consulting_room:{
        type: String,
        required: true
    },
    especiality:{
        type: String,
        required: true
    },
    complete: {
        type: String,
        default: 'no',
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = Book = mongoose.model('book', BookSchema);