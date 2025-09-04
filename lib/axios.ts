import axios from "axios";
import { API_KEYS, BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEYS.X_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
