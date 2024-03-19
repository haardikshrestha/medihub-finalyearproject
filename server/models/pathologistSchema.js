const mongoose = require("mongoose");

const pathologistSchema = new mongoose.Schema({
  email: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  role: {type: String, default: 'user'},
});

const Pathologists = mongoose.model("Pathologist", pathologistSchema);

module.exports = Pathologists;