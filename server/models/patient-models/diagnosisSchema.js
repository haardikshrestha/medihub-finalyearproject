const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  patientEmail: {
    type: String,
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  medications: [{
    name: {
      type: String
    },
    dosage: {
      type: String
    },
    timeOfDay: {
      type: String
    },
    beforeOrAfterEating: {
      type: String
    }
  }],
  notes: {
    type: String
  }
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);