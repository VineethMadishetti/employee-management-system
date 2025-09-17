// server/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'On Leave', 'Terminated'],
        default: 'Active',
    },
    // Reference to the user who created this employee entry
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;