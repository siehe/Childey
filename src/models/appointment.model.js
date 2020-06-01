const mongoose = require('mongoose');
const {DoctorSchema} = require('../models/doctor.model');
const {PatientSchema} = require('../models/patient.model');

const  AppointmentSchema = new mongoose.Schema({
    doctor: {
        type: DoctorSchema,
        required: true
    },
    patient: {
        type: PatientSchema,
        required: true
    },
    date: {
        type: Date,
        required: true
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
        required: true
    }
});

const Appointment = mongoose.model('Appointment',  AppointmentSchema);

exports.Appointment = Appointment;
exports. AppointmentSchema =  AppointmentSchema;