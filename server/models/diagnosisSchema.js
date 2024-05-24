const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true }
}, { _id: false });

const DiagnosisSchema = new Schema({
  patientEmail: { type: String, required: true },
  doctorEmail: { type: String, required: true },
  diagnosisDate: { type: Date, default: Date.now },
  symptoms: { type: [String], required: true },
  diagnosis: { type: String, required: true },
  treatmentPlan: { type: String, required: true },
  medicines: { type: [MedicineSchema], required: true }
});

const Diagnosis = mongoose.model('Diagnosis', DiagnosisSchema);

module.exports = Diagnosis;
