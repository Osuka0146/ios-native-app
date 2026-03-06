import axios from 'axios';

// API de NewsAPI para obtener noticias
const axiosNews = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apiKey: 'YOUR_NEWSAPI_KEY', // Reemplaza con tu clave de API
    language: 'es',
  },
});

export default axiosNews;
