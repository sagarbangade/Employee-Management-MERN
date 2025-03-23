// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    contactInformation: { type: String },
    profilePictureUrl: { type: String }, // URL from Cloudinary
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Employee', employeeSchema);