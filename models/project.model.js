const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    projectName: {
        type: String,
        required: true
    },
    projectDesc: {
        type: String,
        default: 'No Description provided'
    }
}, { timestamps: true, toJSON: { virtuals: true}, toObject: {virtuals: true}});

projectSchema.virtual('url').get(function() {
    return `projects/${this._id}`;
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;