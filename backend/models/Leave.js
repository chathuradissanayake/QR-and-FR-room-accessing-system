const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    leaveTime: {
        type: Date, // Use Date type for leaveTime
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
