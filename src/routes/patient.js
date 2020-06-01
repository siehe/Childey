const express = require('express');
const router = express.Router();
const { PatientRepository } = require('../services/patientRespository');

const patientRepository = new PatientRepository();

router.get('/patient', async (req, res) => {
    const patients = await patientRepository.getAllPatients();

    if(patients){
        res.status(200).send(patients);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/patient/:id', async (req, res) => {
    const patient = await patientRepository.getPatient(req.params.id);

    if(patient){
        res.status(200).send(patient);
    }
    else{
        res.sendStatus(404);
    }
});

router.get('/patient/:id/appointments', async (req, res) => {
    const appointments = await patientRepository.getAppointments(req.params.id);

    if(appointments){
        res.status(200).send(appointments);
    }
    else{
        res.sendStatus(404);
    }
});

router.put('/patient/:patientId/doctors/:doctorId', async (req, res) => {
    await patientRepository.rateDoctor(req.params.doctorId, req.body.rate);
    res.sendStatus(201);
});

router.post('/patient/:id/params', async (req, res) => {
    const params = await patientRepository.sendParams(req.params.id, req.body);

    if(params){
        res.status(201).send(params);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/patient/:id/params/rejected', async (req, res) =>{
    const params = await patientRepository.getRejectedParams(req.params.id);

    if(params){
        res.status(200).send(params);
    }
    else{
        res.sendStatus(400);
    }
});


router.post('/patient', async (req, res) => {
    const patient = await patientRepository.createPatient(req.body);

    if(patient){
        res.status(201).send(patient);
    }
    else{
        res.sendStatus(400);
    }
});

module.exports = router;