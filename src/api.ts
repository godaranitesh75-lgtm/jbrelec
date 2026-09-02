import axios from 'axios';

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured;

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
    return 'http://localhost:4000/api';
  }

  return 'https://jbrelec.onrender.com';
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
