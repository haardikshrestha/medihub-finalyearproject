const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    email: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    gender: { type: String, required: true},
    dateofbirth: { type: String, required: true},
    chronicillness: { type: String, default: "None"},
    address: { type: String, required: true},
    bloodgroup: { type: String, required: true},
});

const Patient = mongoose.model("Doctor", patientSchema, "patients");

module.exports = Patient;
