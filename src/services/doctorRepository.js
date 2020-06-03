const {Doctor} = require('../models/doctor.model');
const {Appointment} = require('../models/appointment.model');
const {Patient} = require('../models/patient.model');
const {Medcard} = require('../models/medcard.model');
const {Pregnancy} = require('../models/pregnancy.model');
const {Parameters} = require('../models/parameters.model');
const bcrypt = require('bcryptjs');

class DoctorRepository {
    async getDoctor(id){  //+
        return await Doctor.findById(id);
    }

    async getAllDoctors(){
        return await Doctor.find({});
    }

    async getDoctorsAppointments(id) { //+
        return await Appointment.find({
            "doctor._id": id
        });
    }

    async getDoctorsPatients(id) { //+
        return await Patient.find({
            "doctor._id": id
        });
    }

    async setAppointment(doctorId, body) { //+
        const appointment = new Appointment({
            doctor: await Doctor.findById(doctorId),
            patient: await Patient.findById(body.patientId),
            date: body.date,
            type: body.type,
            price: body.price,
            isPayed: body.isPayed,
            duration: body.duration
        });

        await appointment.save();

        return appointment;
    }

    async discardAppointment(appointmentId){ 
        await Appointment.deleteOne({_id: appointmentId});
    }

    async createDoctor(createBody){ //+
        const doctor = new Doctor({
            firstName: createBody.firstName,
            lastName: createBody.lastName,
            dob: createBody.dob,
            phoneNumber: createBody.phoneNumber,
            email: createBody.email,
            rank: createBody.rank,
            rating: createBody.rating,
            workingDays: createBody.workingDays,
            workingHours: createBody.workingHours,
            generalPatientNumber: createBody.generalPatientNumber,
            currentPatientNumber: createBody.currentPatientNumber,
            password: await bcrypt.hash(createBody.password, 10)
        });

        await doctor.save();

        return doctor;
    }

    async deleteDoctor(doctorId){ //+
        await Doctor.deleteOne({_id: doctorId});
    }

    async createMedcard(doctorId, body){ //+
        const medcard = new Medcard({
            doctor: await Doctor.findOne({id: doctorId}),
            patient: await Patient.findOne({id: body.patientId}),
            lastUpdated: Date.now(),
            pregnancies: body.pregnancies
        });

        await medcard.save();

        return medcard;
    }

    async createPregnancy(body){ //+
        const mother = await Patient.findOne({_id: body.motherId});
        const pregnancy = new Pregnancy({
            beginDate: body.beginDate,
            mother: mother
        });

        const medcard = await Medcard.findOne({
            "patient._id": motherId
        });

        const pregnancies = medcard.pregnancies;
        pregnancies.push(pregnancy);

        await medcard.update({pregnancies: pregnancies});
        await pregnancy.save();
        await medcard.save();

        return pregnancy;
    }

    async updateMedcard(medcardId, body){ //+
        const patient = await Patient.findOne({id: body.patientId});
        const medcard = await Medcard.findOne({
            _id: medcardId
        });

        await medcard.update({
            lastUpdated: Date.now()
        });

        await patient.update({
            lastSentWeight: body.weight,
            lastSentTemperature: body.temperature,
            lastSentBellySize: body.bellySize
        });
    }

    async acceptParams(patientId, paramsId){
        const params = await Parameters.findById(paramsId);
        const medcard = await Medcard.findOne({
            "patient._id": patientId
        });
        await params.update({checked: true, approved: true});

        await params.save();

        await this.updateMedcard(medcard._id, {
            wieght: params.wieght,
            bellySize: params.belltSize,
            temperature: params.temperature
        });
    }

    async updateParams(paramsId, body){
        const params = await Parameters.findById(paramsId);
        await params.update({checked: true, approved: body.answer, comment: body.comment, lastUpdated: Date.now()});

        await params.save();
    }
}

exports.DoctorRepository = DoctorRepository;