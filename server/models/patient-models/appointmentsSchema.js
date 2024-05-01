const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    apptDate: { type: String, required: true },
    apptPatient: { type: String, required: true },
    apptTime: { type: String, required: true },
    apptDoctor: { type: String, required: true },
    apptStatus: { type: String, default: "pending" },
    apptDisease: { type: String, required: true },
    // paymentStatus: { type: String, required: true },
    // transactionID: { type: String, required: true }
});

appointmentSchema.pre('save', function(next) {
    if (this.paymentStatus === 'paid') {
        this.apptStatus = 'scheduled';
    } else {
        this.apptStatus = 'pending';
    }
    next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
