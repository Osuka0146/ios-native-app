// Ejemplo de cómo usar los stores en componentes Vue 3

// Importar los stores
import { useWeatherStore } from '@/stores/weather'
import { useNewsStore } from '@/stores/news'
import { useDataStore } from '@/stores/data'

export function exampleWeatherUsage() {
  const weatherStore = useWeatherStore()
  
  // Obtener clima por nombre de ciudad
  async function getWeather(cityName: string) {
    await weatherStore.$getWeatherByCityName(cityName)
    console.log('Datos del clima:', weatherStore.weatherData)
  }
  
  // Obtener clima por coordenadas (lat, lon)
  async function getWeatherByCoords(lat: number, lon: number) {
    await weatherStore.$getWeatherByCoordinates(lat, lon)
  }
  
  return { getWeather, getWeatherByCoords }
}

export function exampleNewsUsage() {
  const newsStore = useNewsStore()
  
  // Obtener titulares principales (por país)
  async function getTopNews(country: string = 'mx') {
    await newsStore.$getTopHeadlines(country)
    console.log('Noticias principales:', newsStore.newsList)
  }
  
  // Buscar noticias por tema
  async function searchNews(topic: string) {
    await newsStore.$searchNews(topic)
    console.log('Resultados de búsqueda:', newsStore.newsList)
  }
  
  return { getTopNews, searchNews }
}

export function exampleDataUsage() {
  const dataStore = useDataStore()
  
  // Obtener todos los usuarios
  async function getAllUsers() {
    await dataStore.$getUsers()
    console.log('Usuarios:', dataStore.users)
  }
  
  // Obtener todos los posts
  async function getAllPosts() {
    await dataStore.$getPosts()
    console.log('Posts:', dataStore.posts)
  }
  
  // Obtener posts de un usuario específico
  async function getUserPosts(userId: number) {
    await dataStore.$getPosts(userId)
    console.log('Posts del usuario:', dataStore.posts)
  }
  
  // Obtener comentarios de un post
  async function getPostComments(postId: number) {
    await dataStore.$getComments(postId)
    console.log('Comentarios:', dataStore.comments)
  }
  
  return { getAllUsers, getAllPosts, getUserPosts, getPostComments }
}
