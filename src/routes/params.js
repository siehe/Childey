const express = require('express');
const router = express.Router();
const { DoctorRepository } = require('../services/doctorRepository');
const { PatientRepository } = require('../services/patientRespository');
const {Parameters} = require('../models/parameters.model');

const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();

router.get('/params', async (req, res) => {
    const params = await Parameters.find({});

    res.send(params);
});

router.post('/params', async (req, res) => {
    const params = new Parameters({
        doctor: await doctorRepository.getDoctor(req.body.doctorId),
        patient: await patientRepository.getPatient(req.body.patientId),
        weight: req.body.weight,
        bellySize: req.body.bellySize,
        temperature: req.body.temperature,
        checked: false,
        comment: "",
        lastUpdated: Date.now()
    });

    await params.save();

    res.send(params);
});

router.get('/params/:doctorId', async(req, res) => {
    const params = await Parameters.find({"doctor._id": req.params.doctorId});

    res.send(params);
});

router.put('/params/:id', async(req, res) => {
    await doctorRepository.updateParams(req.params.id, req.body);
    res.sendStatus(200);
});

module.exports = router;