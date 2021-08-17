const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
        trim: true
    },
    fullName:{
        type: String,
        trim: true
    },
    age:{
        type: String,
        trim: true
    },
    adress:{
        type: String,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    telephoneNumber: {
        type: Number,
        trim: true
    },
    dni: {
        type: Number,
        trim: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
        default: 'user'
    },
    imgUrl: {
        type: String,
        trim: true
    },
    room_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consulting',
        default: null
    },
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
      ]
}, {timestamps: true, versionKey: false});

module.exports = User = mongoose.model('user', UserSchema)