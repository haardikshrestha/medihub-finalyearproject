const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  wardId: { type: String, required: true, unique: true },
});

const Ward = mongoose.model("Ward", wardSchema);

module.exports = Ward;