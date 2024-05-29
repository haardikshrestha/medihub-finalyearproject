const mongoose = require('mongoose');

const surgerySchema = new mongoose.Schema({
  patientEmail: {
    type: String,
    required: true
  },
  surgeryDate: {
    type: Date,
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  notes: {
    type: [String], 
    default: [] 
  },
});

const Surgery = mongoose.model('Surgery', surgerySchema);

module.exports = Surgery;
