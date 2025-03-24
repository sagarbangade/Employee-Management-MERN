// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer'); // For handling file uploads

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in 'uploads/' folder (temporary)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname); // Unique filename
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false); // Reject file
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Max 5MB file size
    },
    fileFilter: fileFilter,
});


// Employee Routes - Protected with authMiddleware
router.post('/', authMiddleware, upload.single('profilePicture'), employeeController.createEmployee); // 'profilePicture' is the field name for file upload
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.put('/:id', authMiddleware, upload.single('profilePicture'), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = router;