const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  wardId: { type: String, required: true, unique: true },
  numberOfBeds: { type: Number, required: true },
  bedIds: [{ type: String, required: true }]
});

const Ward = mongoose.model("Ward", wardSchema);

module.exports = Ward;