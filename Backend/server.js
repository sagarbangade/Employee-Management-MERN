// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path"); // Built-in Node.js module

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: ["https://employee-management-mern-phi.vercel.app"] })); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

// Serve static files from 'uploads' folder (optional, for development - not recommended for production)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
