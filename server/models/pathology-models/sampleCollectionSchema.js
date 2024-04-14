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
    appointmentDate: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Sample Pending', 'Test Pending', 'Test Completed'],
        default: 'Sample Pending'
    },
    testID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SampleCollection', sampleCollectionSchema);
