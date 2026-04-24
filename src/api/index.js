import axios from 'axios';
import { startBackendRequest, endBackendRequest } from "../utils/backendWake"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://inventory-app-backend-yftf.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    // Only show wake overlay for API calls (not for local assets)
    startBackendRequest({ delayMs: 900 })
    const token = localStorage.getItem('asa_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    endBackendRequest()
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    endBackendRequest()
    return response
  },
  (error) => {
    endBackendRequest()
    return Promise.reject(error)
  }
)

export default api;
