const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'company name required !'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'position required !']
    }, 
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'job should belong to user, please provide user for this job']
    }
}, {timestamps:true})

module.exports = mongoose.model('job', JobSchema);