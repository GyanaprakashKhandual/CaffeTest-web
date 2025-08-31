const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    testName: { type: String, required: true },
    status: { type: String, required: true },
    filePath: { type: String },
    framework: { type: String },
    expectedResult: { type: String },
    actualResult: { type: String },
    errorMessage: { type: String },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true});



const TestResult = mongoose.model('TestResult', testResultSchema);
module.exports = TestResult;