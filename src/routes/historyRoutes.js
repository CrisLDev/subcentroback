const express = require('express');
const router = express.Router();
const History = require('../models/History');

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
    const has_been_hospitalized_array = has_been_hospitalized === '' || undefined ? 'No aplica' : has_been_hospitalized.split(",");
    const respiratory_array = respiratory === '' || undefined ? 'No aplica' : respiratory.split(",");
    const cardiovascular_array = cardiovascular === '' || undefined ? 'No aplica' : cardiovascular.split(",");
    const genitourinary_array = genitourinary === '' || undefined ? 'No aplica' : genitourinary.split(",");
    const endocrine_array = endocrine === '' || undefined ? 'No aplica' : endocrine.split(",");
    const nervous_array = nervous === '' || undefined ? 'No aplica' : nervous.split(",");
    const muscular_array = muscular === '' || undefined ? 'No aplica' : muscular.split(",");

    const history = new History({
        non_communicable_diseases: non_communicable_diseases_array,
        sexually_transmitted_diseases: sexually_transmitted_diseases_array,
        degenerative_diseases: degenerative_diseases_array,
        others: others_array,
        blood_type,
        adictions: adictions_array,
        allergies: allergies_array,
        antibiotics: antibiotics_array,
        has_been_hospitalized: has_been_hospitalized_array,
        respiratory: respiratory_array,
        cardiovascular: cardiovascular_array,
        genitourinary: genitourinary_array,
        endocrine: endocrine_array,
        nervous: nervous_array,
        muscular: muscular_array,
        conclusions,
        patient_id,
        user_id
    });

    try{

        const savedHistory = await history.save();

        return res.status(200).json({msg: "Historia médica guardada correctamente."})
    }catch(err){
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
            non_communicable_diseases,
            sexually_transmitted_diseases,
            degenerative_diseases,
            others,
            blood_type,
            adictions,
            allergies,
            antibiotics,
            has_been_hospitalized,
            respiratory,
            cardiovascular,
            genitourinary,
            endocrine,
            nervous,
            muscular,
            conclusions,
            user_id
        } = req.body;

        const non_communicable_diseases_array = non_communicable_diseases === '' ? 'No aplica' : non_communicable_diseases.split(",");
        const sexually_transmitted_diseases_array = sexually_transmitted_diseases === '' ? 'No aplica' : sexually_transmitted_diseases.split(",");
        const degenerative_diseases_array = degenerative_diseases === '' ? 'No aplica' : degenerative_diseases.split(",");
        const others_array = others === '' ? 'No aplica' : others.split(",");
        const adictions_array = adictions === '' ? 'No aplica' : adictions.split(",");
        const allergies_array = allergies === '' ? 'No aplica' : allergies.split(",");
        const antibiotics_array = antibiotics === '' ? 'No aplica' : antibiotics.split(",");
        const has_been_hospitalized_array = has_been_hospitalized === '' ? 'No aplica' : has_been_hospitalized.split(",");
        const respiratory_array = respiratory === '' ? 'No aplica' : respiratory.split(",");
        const cardiovascular_array = cardiovascular === '' ? 'No aplica' : cardiovascular.split(",");
        const genitourinary_array = genitourinary === '' ? 'No aplica' : genitourinary.split(",");
        const endocrine_array = endocrine === '' ? 'No aplica' : endocrine.split(",");
        const nervous_array = nervous === '' ? 'No aplica' : nervous.split(",");
        const muscular_array = muscular === '' ? 'No aplica' : muscular.split(",");
    
        const historyToEdit = ({
            non_communicable_diseases: non_communicable_diseases_array,
            sexually_transmitted_diseases: sexually_transmitted_diseases_array,
            degenerative_diseases: degenerative_diseases_array,
            others: others_array,
            blood_type,
            adictions: adictions_array,
            allergies: allergies_array,
            antibiotics: antibiotics_array,
            has_been_hospitalized: has_been_hospitalized_array,
            respiratory: respiratory_array,
            cardiovascular: cardiovascular_array,
            genitourinary: genitourinary_array,
            endocrine: endocrine_array,
            nervous: nervous_array,
            muscular: muscular_array,
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

router.delete('/:id', async(req, res) => {
    try{
        const deletedHistory = await History.findByIdAndRemove(req.params.id);
        return res.status(200).json(deletedHistory);
    } catch(err){
        return res.status(400).json({errors:[{mgs:"No hay datos para mostrar."}]});
    }
});

module.exports = router;