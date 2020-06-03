const express = require('express');
const router = express.Router();
const dateformat = require('dateformat');
const nodemailer = require('nodemailer');
const { DoctorRepository } = require('../services/doctorRepository');
const { PatientRepository } = require('../services/patientRespository');
const { Appointment } = require('../models/appointment.model');

const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();

router.post('/appointment', async(req, res) => {
    if(req.body.test === "+"){
        res.sendStatus(400);
    }
    const appointment = await doctorRepository.setAppointment(req.body.doctorId, req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'childeyteam@gmail.com',
            pass: '!childeyteam1'
        }
    });

    const date = new Date(appointment.date);
    dateformat.masks.basic = 'dd.mm hh:MM';
    const appDate = dateformat(date, 'basic');

    var mailOptions = {
        from: 'childeyteam@gmail.com',
        to: appointment.patient.email,
        subject: 'Ваша зустріч з лікарем ' + appDate,
        text: 'Бажаємо здоров\'я! Візит до лікаря ' + appointment.doctor.firstName + ' ' + appointment.doctor.lastName + ' успішно заплановано!'
      };
      
    transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });

    res.send(appointment);
});

router.get('/appointment/:doctorId', async (req, res) => {
    const appointment = await Appointment.find({"doctor._id":req.params.doctorId});

    if(appointment){
        res.status(200).send(appointment);
    }
    else{
        res.sendStatus(404);
    }
});

module.exports = router;