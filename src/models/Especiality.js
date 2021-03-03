const mongoose = require('mongoose');

const EspecialitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false});

module.exports = Especiality = mongoose.model('especiality', EspecialitySchema);