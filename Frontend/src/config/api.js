// src/config/api.js

// Base URL of your backend (Render deployment)
const BASE_URL = "https://assessment-hrm-salonikelodiya.onrender.com/api";

// Axios instance for all requests
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export default api;
