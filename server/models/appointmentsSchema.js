const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    apptID: {type: String, required: true},
    apptDate: {type: String, required: true},
    apptPatient: {type: String, required: true},
    apptTime: {type: String, required: true},
    apptDoctor: {type: String, required: true},
    apptStatus: {type: String, required: true},
    apptDisease: {type: String, required: true},
    paymentStatus: {type: String, required: true},
    apptStatus: {type: String, required: true},
    transactionID: {type: String, required: true}
})

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;