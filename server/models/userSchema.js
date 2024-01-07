const mongoose = require("mongoose");

// Making schema for user post
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  role: {type: String, default: 'user'},
});

// Put all the above in a basket(User) to use it later on //user means all of the schema
const User = mongoose.model("User", userSchema);

// To use it anywhere:
module.exports = User;
