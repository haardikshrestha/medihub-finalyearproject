const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  depID: { type: String, required: true, unique: true },
  depName: { type: String, required: true, unique: true},
  depNameShort: { type: String, required: true, unique: true}
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;