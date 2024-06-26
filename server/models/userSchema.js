const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  role: {
    type: String,
    enum: ["admin", "user", "doctor", "pathologist"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
