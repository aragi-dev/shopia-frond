import axios from "axios";
import useAuthStore from "@/stores/auth";

const api = axios.create({
  baseURL: "http://localhost:3000/dev",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    if (auth.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;