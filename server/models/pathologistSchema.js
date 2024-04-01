const mongoose = require("mongoose");

const pathologistSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  expertise: { type: String, required: true },
  degree: { type: String, required: true },
  school: { type: String, required: true },
  nmc: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

const Pathologists = mongoose.model("Pathologist", pathologistSchema);

module.exports = Pathologists;