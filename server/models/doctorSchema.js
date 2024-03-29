const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  nmc: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  role: { type: String, default: 'doctor' },
  expertise: { type: String, default: 'null' },
  degree: { type: String, default: 'null' },
  school: { type: String, default: 'null' },
  startTime: { type: String, default: 'null' },
  endTime: { type: String, default: 'null' },
  daysAvailable: { type: [String], default: ['Everyday'] }, // Changed to array type
  fees: { type: String, default: '500' },
  verified: { type: Boolean, default: false },
});

const Doctors = mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;
