// This creates a reusable Axios instance for making HTTP requests to the backend.
// So insted of writing everywhere axios.get("http://localhost:5001/api/products") we create one configured Axios object: api.get("/api/products").

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  // Base URL of the Express backend server.
  // Now every request automatically starts with this URL.
  withCredentials: true
  // Authentication uses cookies, the browser stores token = JWT. When React sends request: api.get("/api/auth/me"), withCredentials: true - tells the browser to include cookies when communicating with this backend.
});

export default api;

