const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    patient_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    non_communicable_diseases:{
        type: Array
    },
    sexually_transmitted_diseases:{
        type: Array
    },
    degenerative_diseases:{
        type: Array
    },
    others:{
        type: Array
    },
    blood_type:{
        type: String,
        required: true
    },
    adictions:{
        type: Array
    },
    allergies:{
        type: Array
    },
    antibiotics:{
        type: Array
    },
    has_been_hospitalized:{
        type: Array
    },
    respiratory:{
        type: Array
    },
    cardiovascular:{
        type: Array
    },
    genitourinary:{
        type: Array
    },
    endocrine:{
        type: Array
    },
    nervous:{
        type: Array
    },
    muscular:{
        type: Array
    },
    conclusions:{
        type: String
    }
}, {timestamps: true, versionKey: false});

module.exports = History = mongoose.model('history', HistorySchema);