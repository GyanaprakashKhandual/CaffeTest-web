const mongoose = require('mongoose');


const testTypeSchema = new mongoose.Schema ({


    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    project: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    testTypeName: {
        type: String,
        required: true
    },
    testTypeDesc: {
        type: String,
        default: 'No Description'
    },
    testFramework: {
        type: String,
        enum: ['Selenium', 'Cypress', 'Appium', 'Playwright', 'K6', 'Rest Assured'],
        required: true
    },
}, { timestamps: true});

const TestType = mongoose.model('TestType', testTypeSchema);
module.exports = TestType;

