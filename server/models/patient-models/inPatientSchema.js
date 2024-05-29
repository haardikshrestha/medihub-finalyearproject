const mongoose = require("mongoose");

const inPatientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dateofbirth: { type: String, required: true },
  chronicillness: { type: String, required: true },
  address: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  admitdate: { type: String, required: true },
  dischargedate: { type: String, default: "TBA" },
  ward: { type: String, required: true },
  bed: { type: String, required: true },
  status: { type: String, enum: ["admitted", "discharged"], default: "admitted" },
  medications: { type: Map, of: String }
});

const InPatient = mongoose.model("InPatient", inPatientSchema, "inpatients");

module.exports = InPatient;
