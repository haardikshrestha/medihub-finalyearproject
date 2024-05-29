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
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    timeOfDay: {
      type: String,
      required: true
    },
    beforeOrAfterEating: {
      type: String,
      required: true
    }
  }],
  notes: {
    type: String
  },
  pdfBuffer: {
    type: Buffer,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
