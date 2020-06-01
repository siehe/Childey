const mongoose = require('mongoose');
const {PatientSchema} = require('../models/patient.model');

const  PregnancySchema = new mongoose.Schema({
    beginDate: {
        type: Date,
        required: true
    },
    mother: {
        type: PatientSchema,
        required: true
    }
});

const Pregnancy = mongoose.model('Pregnancy',  PregnancySchema);

exports.Pregnancy = Pregnancy;
exports. PregnancySchema =  PregnancySchema;