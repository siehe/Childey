const mongoose = require('mongoose');
const {DoctorSchema} = require('../models/doctor.model');
const {PatientSchema} = require('../models/patient.model');
const {PregnancySchema} = require('../models/pregnancy.model');

const  MedcardSchema = new mongoose.Schema({
    doctor: {
        type: DoctorSchema,
        required: true
    },
    patient: {
        type: PatientSchema,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: false
    },
    pregnancies: {
        type: [PregnancySchema],
        required: false
    }
});

const Medcard = mongoose.model('Medcard',  MedcardSchema);

exports.Medcard = Medcard;
exports. MedcardSchema =  MedcardSchema;