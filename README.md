# Employee Management System

## Deployment Link

[**[Deployment Link to your Live Application Here]**](https://employee-management-mern-phi.vercel.app/)

*   **Once you have deployed your application to a live environment, replace the placeholder link above with the actual URL of your deployed Employee Management System.** This will allow others to access and view your live application right away.

---

## Project Description

This is a Full-Stack Employee Management System that allows you to perform CRUD (Create, Read, Update, Delete) operations on employee records. It features profile picture management using Cloudinary for image storage and MongoDB for data persistence. The system is built with a modern, responsive frontend using React.js and a robust backend using Node.js and Express.js.

## Tech Stack

**Frontend:**

*   React.js
*   Redux for State Management
*   React Router for Navigation
*   Axios for API Communication
*   Chakra UI for UI Components
*   Tailwind CSS for Styling (if applicable, adjust as needed)
*   Formik and Yup for Form Handling and Validation
*   Cloudinary React SDK (for image display)

**Backend:**

*   Node.js
*   Express.js
*   MongoDB
*   Mongoose for MongoDB ODM
*   Cloudinary Node.js SDK for Image Storage
*   Multer for File Uploads
*   JWT (JSON Web Tokens) for Authentication
*   bcryptjs for Password Hashing
*   dotenv for Environment Variables
*   cors for Cross-Origin Resource Sharing

**Database:**

*   MongoDB

## Setup Instructions (Local Development)

Follow these steps to set up and run the Employee Management System on your local machine.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd employee-management-backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file in the backend root directory** and configure the following environment variables. **Replace the placeholders with your actual values.**

    ```env
    PORT=5000  # Or any port you prefer (e.g., 3001, 8080)
    MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING  # Your MongoDB connection string (e.g., from MongoDB Atlas or local MongoDB)
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
    CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
    JWT_SECRET=YOUR_JWT_SECRET_KEY # Generate a strong secret key for JWT (e.g., using a password generator)
    ```
    *   **Get MongoDB URI:**  From your MongoDB Atlas account (or local MongoDB setup).
    *   **Get Cloudinary Credentials:** From your Cloudinary account dashboard.
    *   **Generate JWT Secret:** Create a strong, random secret key. Keep this secure.

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server should now be running at `http://localhost:5000` (or the port you configured in `.env`).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd employee-management-frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file in the frontend root directory** (if needed for frontend-specific environment variables, although in this project, it's mostly backend configuration). If you need to define frontend environment variables (like API base URL if different from default), add them in this file (using `VITE_` prefix for Vite projects, e.g., `VITE_API_BASE_URL=http://your-api-url.com/api`). For this project, the API URL is mostly hardcoded to `http://localhost:5000/api` in `services` files, so `.env.local` might not be strictly necessary unless you want to make the API URL configurable via environment variable in the frontend.

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application should now be running at `http://localhost:5173` (or the default Vite development server port).

### Accessing the Application

Open your browser and navigate to `http://localhost:5173` to access the Employee Management System frontend.

## API Endpoints

The backend provides the following RESTful API endpoints:

**Authentication Endpoints (`/api/auth`)**

*   `POST /api/auth/register`: User registration (requires `username`, `password` in request body).
    *   Response: `{ message: "User registered successfully", token: "JWT_TOKEN" }` on success, or error message on failure.
*   `POST /api/auth/login`: User login (requires `username`, `password` in request body).
    *   Response: `{ token: "JWT_TOKEN" }` on success, or error message on invalid credentials.

**Employee Endpoints (`/api/employees`) - *Requires JWT Authentication* (Send JWT token in `Authorization: Bearer <TOKEN>` header)**

*   `POST /api/employees`: Create a new employee (requires JWT, `multipart/form-data` with `name`, `position`, `contactInformation`, and optional `profilePicture` file).
    *   Response: `{ message: "Employee created successfully", employee: { ...employee_data } }` on success, or error message on failure.
*   `GET /api/employees`: Get all employees with pagination and search (requires JWT, query parameters: `page`, `limit`, `search`).
    *   Response: `{ employees: [ ...employee_list ], totalPages: number, currentPage: number, totalEmployees: number }` on success, or error message on failure.
*   `GET /api/employees/:id`: Get employee by ID (requires JWT).
    *   Response: `{ employee: { ...employee_data } }` on success, or error message if employee not found.
*   `PUT /api/employees/:id`: Update employee (requires JWT, `multipart/form-data` with updated employee data and optional new `profilePicture` file).
    *   Response: `{ message: "Employee updated successfully", employee: { ...updated_employee_data } }` on success, or error message if employee not found or on failure.
*   `DELETE /api/employees/:id`: Delete employee (requires JWT).
    *   Response: `{ message: "Employee deleted successfully" }` on success, or error message if employee not found or on failure.

## Deployment Instructions (General)

To deploy the Employee Management System, you will need to deploy both the backend and the frontend separately. Here's a general outline of the deployment process:

1.  **Backend Deployment:**
    *   Choose a hosting platform for Node.js applications (e.g., Heroku, AWS EC2, Google Cloud App Engine, DigitalOcean, etc.).
    *   Configure your hosting environment to match your backend's requirements (Node.js version, environment variables, etc.).
    *   Deploy your backend code to the hosting platform.
    *   Ensure your backend is connected to a MongoDB database (e.g., MongoDB Atlas) in your production environment.
    *   Configure Cloudinary credentials in your production backend environment variables.
    *   Set up HTTPS for your backend API for security.

2.  **Frontend Deployment:**
    *   Build your React frontend for production: `npm run build` in the `employee-management-frontend` directory. This will create an optimized `build` folder.
    *   Choose a hosting platform for static websites (e.g., Netlify, Vercel, AWS S3 + CloudFront, Firebase Hosting, etc.).
    *   Deploy the contents of the `build` folder to your chosen hosting platform.
    *   If your frontend API base URL is different in production than in development (e.g., if your backend is deployed to a different domain), configure the API base URL in your frontend's environment variables or build configuration.

3.  **Database Deployment:**
    *   Ensure your MongoDB database (e.g., MongoDB Atlas) is configured for production access and security.

4.  **Testing:**
    *   After deployment, thoroughly test your application to ensure all features are working correctly in the production environment.


