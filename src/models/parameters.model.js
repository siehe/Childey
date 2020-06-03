const mongoose = require('mongoose');
const {DoctorSchema} = require('../models/doctor.model');
const {PatientSchema} = require('../models/patient.model');

const  ParametersSchema = new mongoose.Schema({
    doctor: {
        type: DoctorSchema,
        required: true
    },
    patient: {
        type: PatientSchema,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    temperature: {
        type: Number,
        required: false
    },
    bellySize: {
        type: Number,
        required: false
    },
    checked:{
        type: Boolean,
        required: true
    },
    approved: {
        type: Boolean,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    lastUpdated:{
        type: Date,
        required: false
    },
    comment:{
        type: String,
        required: false
    },
    seenByPatient:{
        type: Boolean,
        required: false
    }
});

const Parameters = mongoose.model('Parameters',  ParametersSchema);

exports.Parameters = Parameters;
exports. ParametersSchema =  ParametersSchema;