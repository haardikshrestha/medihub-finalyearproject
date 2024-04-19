const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  dosage: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const patientDiagnosisSchema = new mongoose.Schema({
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
  medication: {
    type: Map,
    of: medicationSchema,
    required: true
  },
  comments: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PatientDiagnosis = mongoose.model('PatientDiagnosis', patientDiagnosisSchema);

module.exports = PatientDiagnosis;
