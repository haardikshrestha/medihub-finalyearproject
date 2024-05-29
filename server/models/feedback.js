const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
