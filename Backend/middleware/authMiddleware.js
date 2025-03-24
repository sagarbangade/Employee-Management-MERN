// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header, remove "Bearer "

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' }); // Unauthorized
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Set user in request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' }); // Unauthorized
    }
};