const express = require('express');
const router = express.Router();
const History = require('../models/History');
var ObjectId = require('mongodb').ObjectID;

router.post('/', async(req, res) => {
    const non_communicable_diseases = req.body.non_communicable_diseases ? req.body.non_communicable_diseases : '';
    const sexually_transmitted_diseases = req.body.sexually_transmitted_diseases ? req.body.sexually_transmitted_diseases : '';
    const degenerative_diseases = req.body.degenerative_diseases ? req.body.degenerative_diseases : '';
    const others = req.body.others ? req.body.others : '';
    const blood_type = req.body.blood_type ? req.body.blood_type : '';
    const adictions = req.body.adictions ? req.body.adictions : '';
    const allergies = req.body.allergies ? req.body.allergies : '';
    const antibiotics = req.body.antibiotics ? req.body.antibiotics : '';
    const has_been_hospitalized = req.body.has_been_hospitalized ? req.body.has_been_hospitalized : '';
    const respiratory = req.body.respiratory ? req.body.respiratory : '';
    const cardiovascular = req.body.cardiovascular ? req.body.cardiovascular : '';
    const genitourinary = req.body.genitourinary ? req.body.genitourinary : '';
    const endocrine = req.body.endocrine ? req.body.endocrine : '';
    const nervous = req.body.nervous ? req.body.nervous : '';
    const muscular = req.body.muscular ? req.body.muscular : '';
    const conclusions = req.body.conclusions ? req.body.conclusions : '';
    const {patient_id ,user_id} = req.body;
    
    const non_communicable_diseases_array = non_communicable_diseases === '' || undefined ? 'No aplica' : non_communicable_diseases.split(",");
    const sexually_transmitted_diseases_array = sexually_transmitted_diseases === '' || undefined ? 'No aplica' : sexually_transmitted_diseases.split(",");
    const degenerative_diseases_array = degenerative_diseases === '' || undefined ? 'No aplica' : degenerative_diseases.split(",");
    const others_array = others === '' || undefined ? 'No aplica' : others.split(",");
    const adictions_array = adictions === '' || undefined ? 'No aplica' : adictions.split(",");
    const allergies_array = allergies === '' || undefined ? 'No aplica' : allergies.split(",");
    const antibiotics_array = antibiotics === '' || undefined ? 'No aplica' : antibiotics.split(",");
    const respiratory_array = respiratory === '' || undefined ? 'No aplica' : respiratory.split(",");
    const cardiovascular_array = cardiovascular === '' || undefined ? 'No aplica' : cardiovascular.split(",");
    const genitourinary_array = genitourinary === '' || undefined ? 'No aplica' : genitourinary.split(",");
    const endocrine_array = endocrine === '' || undefined ? 'No aplica' : endocrine.split(",");
    const nervous_array = nervous === '' || undefined ? 'No aplica' : nervous.split(",");
    const muscular_array = muscular === '' || undefined ? 'No aplica' : muscular.split(",");

    const history = new History({
        blood_type,
        has_been_hospitalized,
        conclusions,
        patient_id,
        user_id
    });

    non_communicable_diseases_array.forEach((disease) =>
        history.non_communicable_diseases.unshift({_id: ObjectId(),data: disease})
    );
    sexually_transmitted_diseases_array.forEach((disease) =>
        history.sexually_transmitted_diseases.unshift({_id: ObjectId(),data: disease})
    );
    degenerative_diseases_array.forEach((disease) =>
        history.degenerative_diseases.unshift({_id: ObjectId(),data: disease})
    );
    others_array.forEach((disease) =>
        history.others.unshift({_id: ObjectId(),data: disease})
    );
    adictions_array.forEach((disease) =>
        history.adictions.unshift({_id: ObjectId(),data: disease})
    );
    allergies_array.forEach((disease) =>
        history.allergies.unshift({_id: ObjectId(),data: disease})
    );
    antibiotics_array.forEach((disease) =>
        history.antibiotics.unshift({_id: ObjectId(),data: disease})
    );
    respiratory_array.forEach((disease) =>
        history.respiratory.unshift({_id: ObjectId(),data: disease})
    );
    cardiovascular_array.forEach((disease) =>
        history.cardiovascular.unshift({_id: ObjectId(),data: disease})
    );
    genitourinary_array.forEach((disease) =>
        history.genitourinary.unshift({_id: ObjectId(),data: disease})
    );
    endocrine_array.forEach((disease) =>
        history.endocrine.unshift({_id: ObjectId(),data: disease})
    );
    nervous_array.forEach((disease) =>
        history.nervous.unshift({_id: ObjectId(),data: disease})
    );
    muscular_array.forEach((disease) =>
        history.muscular.unshift({_id: ObjectId(),data: disease})
    );

    try{

        const savedHistory = await history.save();

        return res.status(200).json({msg: "Historia médica guardada correctamente."})
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
            blood_type,
            has_been_hospitalized,
            conclusions,
            user_id
        } = req.body;

        const historyToEdit = ({
            blood_type,
            has_been_hospitalized,
            conclusions,
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
        if(req.body.type === 'non_communicable_diseases'){
            let editedHistory = history.non_communicable_diseases.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.non_communicable_diseases = editedHistory;
        }
        if(req.body.type === 'sexually_transmitted_diseases'){
            let editedHistory = history.sexually_transmitted_diseases.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.sexually_transmitted_diseases = editedHistory;
        }
        if(req.body.type === 'degenerative_diseases'){
            let editedHistory = history.degenerative_diseases.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.degenerative_diseases = editedHistory;
        }
        if(req.body.type === 'others'){
            let editedHistory = history.others.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.others = editedHistory;
        }
        if(req.body.type === 'adictions'){
            let editedHistory = history.adictions.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.adictions = editedHistory;
        }
        if(req.body.type === 'allergies'){
            let editedHistory = history.allergies.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.allergies = editedHistory;
        }
        if(req.body.type === 'antibiotics'){
            let editedHistory = history.antibiotics.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.antibiotics = editedHistory;
        }
        if(req.body.type === 'respiratory'){
            let editedHistory = history.respiratory.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.respiratory = editedHistory;
        }
        if(req.body.type === 'cardiovascular'){
            let editedHistory = history.cardiovascular.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.cardiovascular = editedHistory;
        }
        if(req.body.type === 'genitourinary'){
            let editedHistory = history.genitourinary.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.genitourinary = editedHistory;
        }
        if(req.body.type === 'endocrine'){
            let editedHistory = history.endocrine.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.endocrine = editedHistory;
        }
        if(req.body.type === 'nervous'){
            let editedHistory = history.nervous.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.nervous = editedHistory;
        }
        if(req.body.type === 'muscular'){
            let editedHistory = history.muscular.filter((disease) => disease._id != req.body.itemId)
            editedHistory.unshift({_id: req.body.itemId, data: req.body.data})
            history.muscular = editedHistory;
        }
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
        if(req.body.type === 'non_communicable_diseases'){
            history.non_communicable_diseases.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'sexually_transmitted_diseases'){
            history.sexually_transmitted_diseases.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'degenerative_diseases'){
            history.degenerative_diseases.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'others'){
            history.others.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'adictions'){
            history.adictions.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'allergies'){
            history.allergies.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'antibiotics'){
            history.antibiotics.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'respiratory'){
            history.respiratory.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'cardiovascular'){
            history.cardiovascular.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'genitourinary'){
            history.genitourinary.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'endocrine'){
            history.endocrine.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'nervous'){
            history.nervous.unshift({_id: ObjectId(), data: req.body.data})
        }
        if(req.body.type === 'muscular'){
            history.muscular.unshift({_id: ObjectId(), data: req.body.data})
        }
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
        if(req.params.type === 'non_communicable_diseases'){
            let editedHistory = history.non_communicable_diseases.filter((disease) => disease._id != req.params.itemId)
            console.log(editedHistory)
            history.non_communicable_diseases = editedHistory;
        }
        if(req.params.type === 'sexually_transmitted_diseases'){
            let editedHistory = history.sexually_transmitted_diseases.filter((disease) => disease._id != req.params.itemId)
            history.sexually_transmitted_diseases = editedHistory;
        }
        if(req.params.type === 'degenerative_diseases'){
            let editedHistory = history.degenerative_diseases.filter((disease) => disease._id != req.params.itemId)
            history.degenerative_diseases = editedHistory;
        }
        if(req.params.type === 'others'){
            let editedHistory = history.others.filter((disease) => disease._id != req.params.itemId)
            history.others = editedHistory;
        }
        if(req.params.type === 'adictions'){
            let editedHistory = history.adictions.filter((disease) => disease._id != req.params.itemId)
            history.adictions = editedHistory;
        }
        if(req.params.type === 'allergies'){
            let editedHistory = history.allergies.filter((disease) => disease._id != req.params.itemId)
            history.allergies = editedHistory;
        }
        if(req.params.type === 'antibiotics'){
            let editedHistory = history.antibiotics.filter((disease) => disease._id != req.params.itemId)
            history.antibiotics = editedHistory;
        }
        if(req.params.type === 'respiratory'){
            let editedHistory = history.respiratory.filter((disease) => disease._id != req.params.itemId)
            history.respiratory = editedHistory;
        }
        if(req.params.type === 'cardiovascular'){
            let editedHistory = history.cardiovascular.filter((disease) => disease._id != req.params.itemId)
            history.cardiovascular = editedHistory;
        }
        if(req.params.type === 'genitourinary'){
            let editedHistory = history.genitourinary.filter((disease) => disease._id != req.params.itemId)
            history.genitourinary = editedHistory;
        }
        if(req.params.type === 'endocrine'){
            let editedHistory = history.endocrine.filter((disease) => disease._id != req.params.itemId)
            history.endocrine = editedHistory;
        }
        if(req.params.type === 'nervous'){
            let editedHistory = history.nervous.filter((disease) => disease._id != req.params.itemId)
            history.nervous = editedHistory;
        }
        if(req.params.type === 'muscular'){
            let editedHistory = history.muscular.filter((disease) => disease._id != req.params.itemId)
            history.muscular = editedHistory;
        }
        await history.save();
        return res.status(200).json(history);
    }catch (err){
        console.error(err)
        return res.status(400).json({errors: [{msg: "No hay datos para mostrar."}]})
    }
});

module.exports = router;