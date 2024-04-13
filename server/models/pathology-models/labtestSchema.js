const mongoose = require("mongoose");

const labtestSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  testPrice: { type: Number, required: true },
  testFields: [{ type: String, required: true }]
});


const LabTest = mongoose.model("LabTest", labtestSchema);

module.exports = LabTest;
