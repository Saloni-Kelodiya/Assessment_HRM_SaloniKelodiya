import axios from "axios";  // ✅ must be at the top

// Base URL of your backend (Render deployment)
const BASE_URL = "https://assessment-hrm-salonikelodiya.onrender.com/api";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export default api;
