const mongoose = require('mongoose');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');
const {DoctorSchema} = require('../models/doctor.model');

const PatientSchema = new mongoose.Schema({
    doctor: {
        type: DoctorSchema,
        required: false
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    dob: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    lastSentWeight: {
        type: Number,
        required: false
    },
    lastSentTemperature: {
        type: Number,
        required: false
    },
    lastSentBellySize: {
        type: Number,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    rated:{
        type: Boolean,
        required: false
    },
    email:{
        type: String,
        required: false
    }
});

PatientSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.myprivatekey);
    return token;
}

const Patient = mongoose.model('Patient', PatientSchema);

exports.Patient = Patient;
exports.PatientSchema = PatientSchema;