import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere il token a ogni richiesta
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ RIMOSSO IL REDIRECT AUTOMATICO
// L'AuthProvider gestirà gli errori 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Non fare nulla qui, lascia che ogni componente gestisca i suoi errori
    return Promise.reject(error);
  }
);

export default api;