const express = require('express');
const router = express.Router();
const History = require('../models/History');
var ObjectId = require('mongodb').ObjectID;

router.post('/', async(req, res) => {
    const observations = req.body.observations ? req.body.observations : '';
    const symptom = req.body.symptom ? req.body.symptom : '';
    const breathe = req.body.breathe ? req.body.breathe : '';
    const diagnostic = req.body.diagnostic ? req.body.diagnostic : '';
    const pulse = req.body.pulse ? req.body.pulse : '';
    const weight = req.body.weight ? req.body.weight : '';
    const temperature = req.body.temperature ? req.body.temperature : '';
    const presure = req.body.presure ? req.body.presure : '';
    const {patient_id, user_id} = req.body;
    
    const observations_array = observations === '' || undefined ? 'No aplica' : observations.split(",");
    const symptom_array = symptom  === '' || undefined ? 'No aplica' : symptom.split(",");
    const breathe_array = breathe  === '' || undefined ? 'No aplica' : breathe.split(",");
    const diagnostic_array = diagnostic  === '' || undefined ? 'No aplica' : diagnostic.split(",");
    const pulse_array = pulse  === '' || undefined ? 'No aplica' : pulse.split(",");
    const weight_array = weight  === '' || undefined ? 'No aplica' : weight.split(",");
    const temperature_array = temperature  === '' || undefined ? 'No aplica' : temperature.split(",");
    const presure_array = presure  === '' || undefined ? 'No aplica' : presure.split(",");

    const history = new History({
        patient_id,
        user_id,
    });

    if(observations_array instanceof Array ){
        observations_array.forEach((disease) =>
        history.observations.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(symptom_array instanceof Array ){
    symptom_array.forEach((disease) =>
        history.symptom.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(breathe_array instanceof Array ){
        breathe_array.forEach((disease) =>
        history.breathe.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(diagnostic_array instanceof Array ){
        diagnostic_array.forEach((disease) =>
        history.diagnostic.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(pulse_array instanceof Array ){
    pulse_array.forEach((disease) =>
        history.pulse.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(temperature_array instanceof Array ){
    temperature_array.forEach((disease) =>
        history.temperature.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(weight_array instanceof Array ){
        weight_array.forEach((disease) =>
        history.weight.unshift({_id: ObjectId(),data: disease})
    );
    }
    if(presure_array instanceof Array ){
    presure_array.forEach((disease) =>
        history.presure.unshift({_id: ObjectId(),data: disease})
    );
    }

    try{

        const savedHistory = await history.save();

        return res.status(200).json({savedHistory})
    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }
});

router.get('/patient/:id', async(req, res) => {
    try{
        const histories = await History.find({patient_id: req.params.id}).sort({created_At: -1});
        if(histories){
            return res.status(200).json(histories);
        }
    }catch (err){
        res.status(400).json({msg: "No hay datos para mostrar."})
    }
});

router.get('/:id', async(req, res) => {
    try{
        const history = await History.findById(req.params.id);

        if(history){
            return res.status(200).json(history);
        }else{
            return res.status(400).json({errors: [{msg : "No hay datos para mostrar."}]});
        }
    }catch (err){
        res.status(400).json({msg: "No hay datos para mostrar."})
    }
});

router.put('/:id', async(req, res) => {
    try{
        const {
            user_id
        } = req.body;

        const historyToEdit = ({
            user_id
        });

        const updatedHistory = await History.findOneAndUpdate({_id: req.params.id}, historyToEdit, {new: true});
        return res.status(200).json(updatedHistory);

    }catch (err){
        console.error(err)
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
});

router.put('/:id/item', async(req, res) => {
    try{
        const history = await History.findById(req.params.id);
        if(req.body.type === 'observations'){
            let editedHistory = history.observations.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.observations = editedHistory;
        }
        if(req.body.type === 'symptom'){
            let editedHistory = history.symptom.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.symptom = editedHistory;
        }
        if(req.body.type === 'breathe'){
            let editedHistory = history.breathe.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.breathe = editedHistory;
        }
        if(req.body.type === 'diagnostic'){
            let editedHistory = history.diagnostic.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.diagnostic = editedHistory;
        }
        if(req.body.type === 'temperature'){
            let editedHistory = history.temperature.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.temperature = editedHistory;
        }
        if(req.body.type === 'pulse'){
            let editedHistory = history.pulse.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.pulse = editedHistory;
        }
        if(req.body.type === 'weight'){
            let editedHistory = history.weight.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.weight = editedHistory;
        }
        if(req.body.type === 'presure'){
            let editedHistory = history.presure.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.presure = editedHistory;
        }
        history.date = new Date();
        await history.save();
        return res.status(200).json(history);
    }catch (err){
        console.error(err)
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
});

router.put('/:id/create', async(req, res) => {
    try{
        const history = await History.findById(req.params.id);
        if(req.body.type === 'observations'){
            history.observations.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'breathe'){
            history.breathe.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'symptom'){
            history.symptom.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'diagnostic'){
            history.diagnostic.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'pulse'){
            history.pulse.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'temperature'){
            history.temperature.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'presure'){
            history.presure.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'weight'){
            history.weight.unshift({_id: ObjectId(), data: req.body.data})
        }
        history.date = Date.now();
        await history.save();
        return res.status(200).json(history);
    }catch (err){
        console.error(err)
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const deletedHistory = await History.findByIdAndRemove(req.params.id);
        return res.status(200).json(deletedHistory);
    } catch(err){
        return res.status(400).json({errors:[{mgs:"No hay datos para mostrar."}]});
    }
});

router.put('/:id/:itemId/:type', async(req, res) => {
    try{
        const history = await History.findById(req.params.id);
        if(req.params.type === 'observations'){
            let editedHistory = history.observations.filter((disease) => disease._id != req.params.itemId)
            history.observations = editedHistory;
        }
        if(req.params.type === 'symptom'){
            let editedHistory = history.symptom.filter((disease) => disease._id != req.params.itemId)
            history.symptom = editedHistory;
        }
        if(req.params.type === 'diagnostic'){
            let editedHistory = history.diagnostic.filter((disease) => disease._id != req.params.itemId)
            history.diagnostic = editedHistory;
        }
        if(req.params.type === 'breathe'){
            let editedHistory = history.breathe.filter((disease) => disease._id != req.params.itemId)
            history.breathe = editedHistory;
        }
        if(req.params.type === 'pulse'){
            let editedHistory = history.pulse.filter((disease) => disease._id != req.params.itemId)
            history.pulse = editedHistory;
        }
        if(req.params.type === 'temperature'){
            let editedHistory = history.temperature.filter((disease) => disease._id != req.params.itemId)
            history.temperature = editedHistory;
        }
        if(req.params.type === 'weight'){
            let editedHistory = history.weight.filter((disease) => disease._id != req.params.itemId)
            history.weight = editedHistory;
        }
        if(req.params.type === 'presure'){
            let editedHistory = history.presure.filter((disease) => disease._id != req.params.itemId)
            history.presure = editedHistory;
        }
        history.date = Date.now();
        await history.save();
        return res.status(200).json(history);
    }catch (err){
        console.error(err)
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
});

module.exports = router;