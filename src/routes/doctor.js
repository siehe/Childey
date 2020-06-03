const express = require('express');
const router = express.Router();
const authDoctor = require('../middlware/authDoctor');
const bcrypt = require('bcryptjs');
const { DoctorRepository } = require('../services/doctorRepository');
const { PatientRepository } = require('../services/patientRespository');

const { Doctor } = require('../models/doctor.model');

const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();

router.post('/doctor/login', async (req, res) => {
    const doctor = await Doctor.findOne({phoneNumber: req.body.phoneNumber});

    if(!doctor){
        return res.status(404).send('No users were found with the given credentials');
    }

    if(await bcrypt.compare(req.body.password, doctor.password)){
        const token = doctor.generateAuthToken();
        res.header('x-auth-token', token).status(200).send({
            doctorId: doctor._id,
            token: token
        });
    }
    else{
        res.status(401).send('Wrong credentials');
    }
});

router.get('/doctor', async (req, res) => {
    const doctors = await doctorRepository.getAllDoctors();

    if(doctors){
        res.status(200).send(doctors);
    }
    else{
        res.sendStatus(400);
    }
});

router.get('/doctor/:id', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
    const doctor = await doctorRepository.getDoctor(req.params.id);

    if(doctor){
        res.status(200).send(doctor);
    }
    else {
        res.sendStatus(404);
    }
});

router.get('/doctor/:id/appointments', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
    const appointments = await doctorRepository.getDoctorsAppointments(req.params.id);

    if(appointments){
        res.status(200).send(appointments);
    } 
    else {
        res.sendStatus(404);
    }
});

router.get('/doctor/:id/patients', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
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

    const token = doctor.generateAuthToken();

    if(doctor){
        res.header('x-auth-token', token).status(201).send(doctor);
    }
    else{
        res.sendStatus(400);
    }
});

router.post('/doctor/:id/appointment', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
    const appointment = await doctorRepository.setAppointment(req.params.id, req.body);

    if(appointment){
        res.status(201).send(appointment);
    }
    else{
        res.sendStatus(400);
    }
});

router.post('/doctor/:id/pregnancy', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
    const pregnancy = await doctorRepository.createPregnancy(req.body);

    if(pregnancy){
        res.status(201).send(pregnancy);
    }
    else {
        res.sendStatus(400);
    }
});

router.post('/doctor/:id/medcard', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
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

router.get('/doctor/:id/patient/:lastName', authDoctor, async (req, res) => {
    if(req.params.id !== req.doctor._id){
        res.status(403).send('Access denied');
    }
    const patients = await patientRepository.findByLastName(req.params.lastName, req.params.id);

    res.status(200).send(patients);
});

router.put('/doctor/aaaa', async (req, res) => {
    const doctor = await doctorRepository.getDoctor(req.body.doctorId);
    const patient = await patientRepository.getPatient(req.body.patientId);

    await patient.update({doctor: doctor});

    patient.save();

    res.send(patient);
});

module.exports = router;