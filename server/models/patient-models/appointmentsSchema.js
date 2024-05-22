const mongoose = require("mongoose");

const appointmentStatusEnum = ["Pending", "Scheduled", "Completed"];

const appointmentSchema = new mongoose.Schema({
    apptID: { type: String, required: true, unique: true }, 
    apptDate: { type: Date, required: true }, 
    apptPatient: { type: String, required: true },
    apptTime: { type: String, required: true },
    apptDoctor: { type: String, required: true },
    apptReason: { type: String, required: true },
    apptStatus: { type: String, enum: appointmentStatusEnum, default: "Pending" },
});

// Create Appointment model
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Export the model
module.exports = Appointment;
