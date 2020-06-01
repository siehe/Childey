const mongoose = require('mongoose');

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
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

exports.Doctor = Doctor;
exports.DoctorSchema = DoctorSchema;