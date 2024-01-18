const mongoose = require("mongoose");

const pathologistSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  role: {type: String, default: 'user'},
});

const Pathologist = mongoose.model("User", pathologistSchema);

module.exports = Pathologist;