const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  diagnosis: {
    type: String,
    required: true,
  },
  medications: [
    {
      name: String,
      dosage: String,
      timeOfDay: String,
      beforeOrAfterEating: String,
    },
  ],
  notes: String,
});

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);

module.exports = Diagnosis;
