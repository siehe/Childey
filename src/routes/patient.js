const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authPatinet = require('../middlware/authPatinet');
const { PatientRepository } = require('../services/patientRespository');
const {Parameters} = require('../models/parameters.model');

const {Patient} = require('../models/patient.model');

const patientRepository = new PatientRepository();

router.post('/patient/login', async (req, res) => {
    const patient = await Patient.findOne({phoneNumber: req.body.phoneNumber});

    if(!patient){
        return res.status(404).send('No users were found with the given credentials');
    }

    if(await bcrypt.compare(req.body.password, patient.password)){
        const token = patient.generateAuthToken();
        res.header('x-auth-token', token).status(200).send({
            patientId: patient._id,
            token: token
        });
    }
    else{
        res.status(401).send('Wrong credentials');
    }
});

router.get('/patient', async (req, res) => {
    const patients = await patientRepository.getAllPatients();

    if(patients){
        res.status(200).send(patients);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/patient/:id', authPatinet, async (req, res) => {

    if(req.params.id !== req.patient._id){
        res.status(403).send('Access denied');
    }
    const patient = await patientRepository.getPatient(req.params.id);

    if(patient){
        res.status(200).send(patient);
    }
    else{
        res.sendStatus(404);
    }
});

router.get('/patient/:id/appointments', authPatinet, async (req, res) => {
    if(req.params.id !== req.patient._id){
        res.status(403).send('Access denied');
    }
    const appointments = await patientRepository.getAppointments(req.params.id);

    if(appointments){
        res.status(200).send(appointments);
    }
    else{
        res.sendStatus(404);
    }
});

router.put('/patient/:patientId/doctors/:doctorId', authPatinet, async (req, res) => {
    if(req.params.patientId !== req.patient._id){
        res.status(403).send('Access denied');
    }
    await patientRepository.rateDoctor(req.params.doctorId, req.body.rate, req.params.patientId);
    res.sendStatus(201);
});

router.post('/patient/:id/params', authPatinet, async (req, res) => {
    if(req.params.id !== req.patient._id){
        res.status(403).send('Access denied');
    }
    const params = await patientRepository.sendParams(req.params.id, req.body);

    if(params){
        res.status(201).send(params);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/patient/:id/params/rejected', authPatinet, async (req, res) =>{
    if(req.params.id !== req.patient._id){
        res.status(403).send('Access denied');
    }
    const params = await patientRepository.getRejectedParams(req.params.id);

    if(params){
        res.status(200).send(params);
    }
    else{
        res.sendStatus(400);
    }
});

router.put('/patient/:id/params/rejected', authPatinet, async (req, res) => {
    if(req.params.id !== req.patient._id){
        res.status(403).send('Access denied');
    }
    const params = await Parameters.findById(req.body.paramId);

    if(!params){
        res.sendStatus(404);
    }

    await params.update({seenByPatient: true});

    await params.save();

    res.status(201).send(params);
});

router.post('/patient', async (req, res) => {
    const patient = await patientRepository.createPatient(req.body);

    const token = patient.generateAuthToken();

    if(patient){
        res.header('x-auth-token', token).status(201).send(patient);
    }
    else{
        res.sendStatus(400);
    }
});



module.exports = router;