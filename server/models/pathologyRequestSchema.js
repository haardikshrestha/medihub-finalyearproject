const mongoose = require('mongoose');

// Define the schema for the PathologyRequest model
const pathologyRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  testToBeDone: {
    type: String,
    required: true
  },
  additionalNotes: String
});

// Create the PathologyRequest model
const PathologyRequest = mongoose.model('PathologyRequest', pathologyRequestSchema);

module.exports = PathologyRequest;
