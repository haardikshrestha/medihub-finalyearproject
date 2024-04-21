const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleCollectionSchema = new Schema({
    patientEmail: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Sample Pending', 'Test Pending', 'Test Completed', 'Cancelled'],
        default: 'Sample Pending'
    },
    testID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SampleCollection', sampleCollectionSchema);
