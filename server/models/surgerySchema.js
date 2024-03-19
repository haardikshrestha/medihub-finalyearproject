const mongoose = require('mongoose');

const surgerySchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  surgeryDate: {
    type: Date,
    required: true
  },
  surgeonName: {
    type: String,
    required: true
  },
  assistantSurgeonName: String,
  anesthesiaType: String,
  procedure: {
    type: String,
    required: true
  },
  notes: String,
  complications: String,
  medicationsPrescribed: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String
  }],
  followUpDate: Date,
  followUpNotes: String
});

const Surgery = mongoose.model('Surgery', surgerySchema);

module.exports = Surgery;
