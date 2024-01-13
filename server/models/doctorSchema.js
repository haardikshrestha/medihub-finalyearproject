const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    nmc: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    role: { type: String, default: "doctor"},
    expertise: { type: String, default: "null"},
    degree1: { type: String, default: "null"},
    degree2: { type: String, default: "null"},
    degree3: { type: String, default: "null"},
    experience1: { type: String, default: "null"},
    experience2: { type: String, default: "null"},
    workingHours: { type: String, default: "null"},
    apptDuration: { type: String, default: "null"},
    daysAvailable: { type: String, default: "Everyday"},
    fees: { type: String, default: "500"},
    verified: { type: Boolean, default: false}
});

const Doctor = mongoose.model("Doctor", doctorSchema, "users");

module.exports = Doctor;
