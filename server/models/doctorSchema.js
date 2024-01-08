const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    nmc: { type: String, required: true, unique: true},
    expertise: { type: String, default: "null"},
    degree1: { type: String, default: "null"},
    degree2: { type: String, default: "null"},
    degree3: { type: String, default: "null"},
    experience1: { type: String, default: "null"},
    experience2: { type: String, default: "null"},
    workingHours: { type: TimeRanges, default: "null"},
    apptDuration: { type: String, default: "null"},
    daysAvailable: { type: String, default: "Everyday"},
    fees: { type: String, default: "500"},
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
