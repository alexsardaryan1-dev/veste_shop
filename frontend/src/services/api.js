// This creates a reusable Axios instance for making HTTP requests to the backend.
// So insted of writing everywhere axios.get("http://localhost:5001/api/products") we create one configured Axios object: api.get("/api/products").

import axios from "axios";

// Reads VITE_API_URL from the environment (set in .env / .env.production).
// Falls back to localhost so local development still works with zero setup.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL,
  // Base URL of the Express backend server.
  // Now every request automatically starts with this URL.
  withCredentials: true
  // Authentication uses cookies, the browser stores token = JWT. When React sends request: api.get("/api/auth/me"), withCredentials: true - tells the browser to include cookies when communicating with this backend.
});

export default api;
export { API_BASE_URL };