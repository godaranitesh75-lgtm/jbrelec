import axios from 'axios';

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured;

  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
  return isLocalhost ? 'http://localhost:4000/api' : '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jbr_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
