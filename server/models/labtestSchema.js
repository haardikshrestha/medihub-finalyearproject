const mongoose = require("mongoose");

const labtestSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  testDetails: [{ type: String, required: true }] 
});

const LabTest = mongoose.model("LabTest", labtestSchema);

module.exports = LabTest;
