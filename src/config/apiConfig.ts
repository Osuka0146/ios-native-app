/**
 * Configuración centralizada de todas las APIs
 * Actualiza las claves API y URLs según tus necesidades
 */

export const API_CONFIG = {
  // OpenWeatherMap API
  weather: {
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_OPENWEATHER_API_KEY',
    units: 'metric',
    language: 'es',
  },

  // NewsAPI
  news: {
    baseURL: 'https://newsapi.org/v2/',
    apiKey: import.meta.env.VITE_NEWS_API_KEY || 'YOUR_NEWSAPI_KEY',
    language: 'es',
  },

  // JSONPlaceholder (No requiere API key)
  jsonPlaceholder: {
    baseURL: 'https://jsonplaceholder.typicode.com/',
  },

  // Ejemplo: CoinGecko API (Criptomonedas - sin API key)
  crypto: {
    baseURL: 'https://api.coingecko.com/api/v3/',
  },

  // Ejemplo: GitHub API
  github: {
    baseURL: 'https://api.github.com/',
    // PAT (Personal Access Token) - opcional, para mayor límite de requests
    // token: import.meta.env.VITE_GITHUB_TOKEN || '',
  },

  // Ejemplo: REST Countries API (Info de países)
  countries: {
    baseURL: 'https://restcountries.com/v3.1/',
  },
}

export const API_ENDPOINTS = {
  weather: {
    current: 'weather',
    forecast: 'forecast',
  },
  news: {
    topHeadlines: 'top-headlines',
    everything: 'everything',
  },
  jsonPlaceholder: {
    users: 'users',
    posts: 'posts',
    comments: 'comments',
    todos: 'todos',
  },
  crypto: {
    markets: 'coins/markets',
    global: 'global',
  },
  github: {
    users: 'users',
    repos: 'repos',
  },
  countries: {
    all: 'all',
    byName: 'name',
  },
}
