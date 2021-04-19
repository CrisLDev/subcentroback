const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    //dateStart:{
        //type: String,
        //required: true
    //},
    dateStart:{
        type: String,
        required: true
    },
    //dateEnd:{
        //type: String,
        //required: true
    //},
    dateEnd:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
}, {timestamps: true, versionKey: false});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);