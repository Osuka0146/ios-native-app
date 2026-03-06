import axios from 'axios';

// API de OpenWeatherMap para obtener datos de clima
const axiosWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    appid: 'YOUR_OPENWEATHER_API_KEY', // Reemplaza con tu clave de API
    units: 'metric', // Usar unidades métricas
    lang: 'es',
  },
});

export default axiosWeather;
