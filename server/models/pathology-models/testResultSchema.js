const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testResultsSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    testResultsPdf: {
        data: Buffer,  
        contentType: String 
    },
    date: {
        type: Date,
        default: Date.now
    },
    testType: {
        type: String
    },
    comments: {
        type: String
    },
});

module.exports = mongoose.model('TestResult', testResultsSchema);
