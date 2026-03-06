import axios from 'axios';

// API JSONPlaceholder para datos de prueba (usuarios, posts, comentarios)
const axiosJsonPlaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosJsonPlaceholder;
