const mongoose = require("mongoose");

const labtestSchema = new mongoose.Schema({
  testName: { type: String, required: true, unique: true },
  testPrice: { type: Number, required: true },
  testFields: [{
    fieldName: { type: String, required: true },
    normalRange: { type: String, required: true } // You can adjust the type as needed
  }]
});

const LabTest = mongoose.model("LabTest", labtestSchema);

module.exports = LabTest;
