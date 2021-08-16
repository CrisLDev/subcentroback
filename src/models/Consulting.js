const mongoose = require('mongoose');

const ConsultingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    especiality:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
}, {timestamps: true, versionKey: false});

module.exports = Consulting = mongoose.model('consulting', ConsultingSchema);