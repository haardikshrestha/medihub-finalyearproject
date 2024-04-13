const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema({
  email: String,
  token: String,
  expiresAt: Date,
});

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);

module.exports = PasswordResetToken;
