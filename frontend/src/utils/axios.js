import axios from "axios";
import { camelizeKeys } from "humps";

const api = axios.create({ baseURL: "http://localhost:8000/api" });

// Ajoute le token à chaque requête automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Gère les erreurs globalement
api.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data);
    return response;
  },
  (error) => {
    const url = error.config?.url || "";

    const isLoginRequest = url.includes("/login") || url.includes("login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default api;
