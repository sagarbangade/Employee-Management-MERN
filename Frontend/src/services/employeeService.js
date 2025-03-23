import axios from "axios";

const API_BASE_URL =
  "https://employee-management-mern-g423.onrender.com/api/employees"; // Backend Employee routes URL

// Interceptor to add JWT token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllEmployees = async (page, limit, search) => {
  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&limit=${limit}&search=${search}`
  );
  return response.data; // Expecting { employees: [], totalPages, currentPage, totalEmployees }
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data; // Expecting { employee: {} }
};

export const createEmployee = async (employeeData) => {
  return axios.post(`${API_BASE_URL}`, employeeData, {
    headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
  });
};

export const updateEmployee = async (id, employeeData) => {
  return axios.put(`${API_BASE_URL}/${id}`, employeeData, {
    headers: { "Content-Type": "multipart/form-data" }, // Important for file upload
  });
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
