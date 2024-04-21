const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  testName: {
    type: String,
    required: true
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

const LabReport = mongoose.model('LabReport', labReportSchema);

module.exports = LabReport;