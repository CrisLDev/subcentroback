const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async(req, res) => {
    try {
        const {/*dateStart,*/ hourStart, /*dateEnd,*/ hourEnd, doctor_id, day} = req.body;

        const scheduleExist = await Schedule.findOne({dateStart: hourStart, dateEnd: hourEnd, doctor_id: doctor_id, day: day});

        if(scheduleExist){
            return res.status(400).json({msg: 'Horario ya existe.'})
        }

        const newSchedule = new Schedule({
            dateStart: hourStart, day, dateEnd: hourEnd, doctor_id, title: 'Horario'
        });

        const scheduleSave = await newSchedule.save();

        return res.json(scheduleSave);

    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const schedules = await Schedule.find({doctor_id: req.params.id}).populate('doctor_id');
        return res.json(schedules);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const scheduleToDelete = await Schedule.findByIdAndRemove(req.params.id);
        return res.json(scheduleToDelete);
    } catch (err) {
        console.error(err.menssage);
        return res.status(400).json({err});
    }
});

module.exports = router;