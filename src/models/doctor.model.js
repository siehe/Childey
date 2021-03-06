const mongoose = require('mongoose');
const config = require('../config/default.json');
const jwt = require('jsonwebtoken');

const DoctorSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    workingDays:{
        type: [String],
        required: true
    },
    workingHours: {
        type: String,
        required: false
    },
    generalPatientNumber: {
        type: Number,
        required: false
    },
    currentPationNumber: {
        type: Number,
        required: false
    },
    numberOfRated:{
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: false
    }
});

DoctorSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.myprivatekey);
    return token;
}

const Doctor = mongoose.model('Doctor', DoctorSchema);

exports.Doctor = Doctor;
exports.DoctorSchema = DoctorSchema;