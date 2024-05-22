const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  nmc: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  role: { type: String, default: 'doctor' },
  expertise: { type: String, default: 'null' },
  degree: { type: String, default: 'null' },
  school: { type: String, default: 'null' },
  startTime: { type: String, default: 'null' },
  endTime: { type: String, default: 'null' },
  daysAvailable: { type: [String], default: ['Everyday'] }, 
  fees: { type: String, default: '500' },
});

const Doctors = mongoose.model('Doctors', doctorSchema);

module.exports = Doctors;
