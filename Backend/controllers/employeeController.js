// controllers/employeeController.js
const Employee = require('../models/Employee');
const cloudinary = require('../config/cloudinary');
const fs = require('fs'); // Node.js file system module

// Create Employee
exports.createEmployee = async (req, res) => {
    try {
        const { name, position, contactInformation } = req.body;
        let profilePictureUrl = null;

        if (req.file) { // Check if a file was uploaded
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePictureUrl = result.secure_url;
            fs.unlinkSync(req.file.path); // Remove file from server after upload to Cloudinary
        }

        const employee = new Employee({
            name,
            position,
            contactInformation,
            profilePictureUrl,
        });

        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Employees with Pagination and Search
exports.getAllEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query; // Default page 1, limit 10
        const skip = (page - 1) * limit;

        const query = {
            $or: [
                { name: { $regex: search, $options: 'i' } }, // 'i' for case-insensitive
                { position: { $regex: search, $options: 'i' } },
            ],
        };

        const employees = await Employee.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); // Sort by creation date, newest first

        const totalEmployees = await Employee.countDocuments(query);
        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            employees,
            totalPages,
            currentPage: parseInt(page),
            totalEmployees,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ employee });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') { // Handle invalid ObjectId format
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const { name, position, contactInformation } = req.body;
        let profilePictureUrl = null;
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (req.file) {
            if (employee.profilePictureUrl) {
                // Extract public_id from Cloudinary URL and delete previous image
                const publicId = employee.profilePictureUrl.match(/([^/]+)\.([a-z]+)$/i)[1];
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePictureUrl = result.secure_url;
            fs.unlinkSync(req.file.path); // Remove file from server after upload
        } else {
            profilePictureUrl = employee.profilePictureUrl; // Keep existing URL if no new file
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name,
                position,
                contactInformation,
                profilePictureUrl,
            },
            { new: true, runValidators: true } // new: true to return updated doc, runValidators to validate updates
        );

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (employee.profilePictureUrl) {
            // Extract public_id from Cloudinary URL and delete image from Cloudinary
            const publicId = employee.profilePictureUrl.match(/([^/]+)\.([a-z]+)$/i)[1];
             if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};