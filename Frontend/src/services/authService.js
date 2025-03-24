import axios from 'axios';

const API_BASE_URL = 'https://employee-management-mern-g423.onrender.com/api/auth'; // Backend Auth routes URL

export const register = async (userData) => {
    return axios.post(`${API_BASE_URL}/register`, userData);
};

export const login = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data; // Expecting { token: '...' }
};