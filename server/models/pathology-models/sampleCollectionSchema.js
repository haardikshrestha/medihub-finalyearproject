const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleCollectionSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    appointmentDateTime: {
        type: String,
        required: true
    },
    testType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Sample Pending', 'Test Pending', 'Test Completed'],
        default: 'Sample Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SampleCollection', sampleCollectionSchema);
