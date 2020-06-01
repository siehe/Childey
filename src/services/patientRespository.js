const {Doctor} = require('../models/doctor.model');
const {Appointment} = require('../models/appointment.model');
const {Patient} = require('../models/patient.model');
const {Medcard} = require('../models/medcard.model');
const {Pregnancy} = require('../models/pregnancy.model');
const {Parameters} = require('../models/parameters.model');

class PatientRepository{
    async getPatient(id){
        return await Patient.findById(id);
    }

    async getAllPatients(){
        return await Patient.find({});
    }

    async createPatient(body){
        console.log(body);
        const patient = new Patient({
            doctor: await Doctor.findById(body.doctorId),
            firstName: body.firstName,
            lastName: body.lastName,
            dob: body.dob,
            phoneNumber: body.phoneNumber
        });

        patient.save();

        return patient;
    }

    async getAppointments(id){
        return await Appointment.find({
            "patient._id": id
        });
    }

    async setAppointment(patientId, body){
        const appointment = new Appointment({
            doctor: await Doctor.findById(body.doctorId),
            patient: await Patient.findById(patientId),
            date: body.date,
            type: body.type,
            price: body.price,
            isPayed: body.isPayed
        });

        await appointment.save();
        return appointment;
    }

    async discardAppointment(appointmentId){ 
        await Appointment.deleteOne({_id: appointmentId});
    }

    async rateDoctor(doctorId, ratingScore){
        const doctor = await Doctor.findById(doctorId);
        const newRate = ((doctor.rating * doctor.numberOfRated) + ratingScore) / (doctor.numberOfRated + 1);
        await doctor.update({numberOfRated: doctor.numberOfRated + 1});
        await doctor.update({rating: newRate});
        await doctor.save();
    }

    async sendParams(patientId, body){

        const params = new Parameters({
            weight: body.weight,
            temperature: body.temperature,
            bellySize: body.bellySize,
            checked: false,
            patient: await Patient.findById(patientId),
            doctor: await Doctor.findById(body.doctorId)
        });

        await params.save();

        return params;
    }

    async getRejectedParams(patientId){
        console.log(patientId);
        const params = await Parameters.find({
            "patient._id": patientId,
            approved: false
        });

        return params;
    }
}


exports.PatientRepository = PatientRepository;