const mongoose = require('mongoose');
const {DoctorSchema} = require('../models/doctor.model');
const {PatientSchema} = require('../models/patient.model');

const  AppointmentSchema = new mongoose.Schema({
    doctor: {
        type: DoctorSchema,
        required: false
    },
    patient: {
        type: PatientSchema,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    isPayed: {
        type: Boolean,
        required: false
    },
    duration: {
        type: Number,
        required: false
    }
});

const Appointment = mongoose.model('Appointment',  AppointmentSchema);

exports.Appointment = Appointment;
exports. AppointmentSchema =  AppointmentSchema;