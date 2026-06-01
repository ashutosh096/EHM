import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5000" : "/api",
  // baseURL: "/api/",
});

// Attach token(if availabe) from localStorage to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authorization");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
