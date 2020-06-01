const express = require('express');
const router = express.Router();
const { DoctorRepository } = require('../services/doctorRepository');

const doctorRepository = new DoctorRepository();

router.get('/doctor', async (req, res) => {
    const doctors = await doctorRepository.getAllDoctors();

    if(doctors){
        res.status(200).send(doctors);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/doctor/:id', async (req, res) => {
    const doctor = await doctorRepository.getDoctor(req.params.id);

    if(doctor){
        res.status(200).send(doctor);
    }
    else {
        res.sendStatus(404);
    }
});

router.get('/doctor/:id/appointments', async (req, res) => {
    const appointments = await doctorRepository.getDoctorsAppointments(req.params.id);

    if(appointments){
        res.status(200).send(appointments);
    } 
    else {
        res.sendStatus(404);
    }
});

router.get('/doctor/:id/patients', async (req, res) => {
    const patients = await doctorRepository.getDoctorsPatients(req.params.id);

    if(patients){
        res.status(200).send(patients);
    }
    else {
        res.sendStatus(404);
    }
});

router.post('/doctor', async (req, res) => {
    const doctor = await doctorRepository.createDoctor(req.body);

    res.status(201).send(doctor);
});

router.post('/doctor/:id/appointment', async (req, res) => {
    const appointment = await doctorRepository.setAppointment(req.params.id, req.body);

    if(appointment){
        res.status(201).send(appointment);
    }
    else{
        res.sendStatus(400);
    }
});

router.post('/doctor/:id/pregnancy', async (req, res) => {
    const pregnancy = await doctorRepository.createPregnancy(req.body);

    if(pregnancy){
        res.status(201).send(pregnancy);
    }
    else {
        res.sendStatus(400);
    }
});

router.post('/doctor/:id/medcard', async (req, res) => {
    const medcard = await doctorRepository.createMedcard(req.params.id, req.body);

    if(medcard){
        res.status(201).send(medcard);
    }
    else{
        res.sendStatus(400);
    }
});

router.put('/medcard/:medcardId', async (req, res) => {
    const medcard = doctorRepository.updateMedcard(req.params.medcardId, req.body);

    if(medcard){
        res.status(203).send(medcard);
    }
    else{
        res.sendStatus(400);
    }
});

router.delete('/doctor/:id', async (req, res) => {
    await doctorRepository.deleteDoctor(req.params.id);
    res.sendStatus(200);
});

router.delete('/appointment/:appointmentId', async (req, res) => {
    await doctorRepository.discardAppointment(req.params.appointmentId);
    res.sendStatus(200);
});

router.put('/doctor/:id/params/:paramsId', async (req, res) => {
    await doctorRepository.declineParams(req.params.paramsId);
    res.sendStatus(200);
});

module.exports = router; //5ed39cd4f0c476093c8bf114

//http://localhost:3000/doctor/5ec852892936992a341fbdd6/params/5ed39cd4f0c476093c8bf114