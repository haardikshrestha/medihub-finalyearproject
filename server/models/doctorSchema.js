const mongoose = require('mongoose');

// Assuming 'Doctors' is the new name for your model
const modelName = 'Doctors';

// Check if the model is already defined
if (mongoose.connection.models[modelName]) {
  // If yes, delete the existing model
  delete mongoose.connection.models[modelName];
}

// Define your Doctors model here
const doctorSchema = new mongoose.Schema({
  nmc: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  role: { type: String, default: 'doctor' },
  expertise: { type: String, default: 'null' },
  degree: { type: String, default: 'null' },
  school: { type: String, default: 'null' },
  startTime: { type: String, default: 'null' },
  endTime: { type: String, default: 'null' },
  daysAvailable: { type: String, default: 'Everyday' },
  fees: { type: String, default: '500' },
});

const Doctors = mongoose.model(modelName, doctorSchema);

module.exports = Doctors;
