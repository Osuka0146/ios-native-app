# Documentación de APIs

## Resumen
Esta aplicación implementa un sistema para consumir múltiples APIs externas y almacenar los datos en el Store (Pinia).

## APIs Implementadas

### 1. OpenWeatherMap API (Clima)
**Archivo Store:** `src/stores/weather.ts`
**Archivo Axios:** `src/axios/axiosWeather.ts`

**Configuración requerida:**
- Obtén una clave API en: https://openweathermap.org/api
- Reemplaza `YOUR_OPENWEATHER_API_KEY` en `axiosWeather.ts`

**Funciones disponibles:**
- `$getWeatherByCityName(cityName: string)` - Obtener clima por nombre de ciudad
- `$getWeatherByCoordinates(lat: number, lon: number)` - Obtener clima por coordenadas
- `$clearWeatherData()` - Limpiar datos del clima

**Propiedades del Store:**
- `weatherData` - Datos actuales del clima
- `loading` - Estado de carga
- `error` - Mensajes de error

---

### 2. NewsAPI (Noticias)
**Archivo Store:** `src/stores/news.ts`
**Archivo Axios:** `src/axios/axiosNews.ts`

**Configuración requerida:**
- Obtén una clave API en: https://newsapi.org
- Reemplaza `YOUR_NEWSAPI_KEY` en `axiosNews.ts`

**Funciones disponibles:**
- `$getTopHeadlines(country: string)` - Obtener titulares principales por país
- `$searchNews(query: string)` - Buscar noticias por tema
- `$clearNews()` - Limpiar lista de noticias

**Propiedades del Store:**
- `newsList` - Lista de artículos
- `loading` - Estado de carga
- `error` - Mensajes de error

---

### 3. JSONPlaceholder API (Datos de Prueba)
**Archivo Store:** `src/stores/data.ts`
**Archivo Axios:** `src/axios/axiosJsonPlaceholder.ts`

**Ventaja:** API pública, no requiere clave API

**Funciones disponibles:**
- `$getUsers()` - Obtener lista de usuarios
- `$getPosts(userId?: number)` - Obtener posts (opcional: de un usuario específico)
- `$getComments(postId?: number)` - Obtener comentarios (opcional: de un post específico)
- `$clearAllData()` - Limpiar todos los datos

**Propiedades del Store:**
- `users` - Lista de usuarios
- `posts` - Lista de posts
- `comments` - Lista de comentarios
- `loading` - Estado de carga
- `error` - Mensajes de error

---

## Cómo Usar en Componentes

### Ejemplo 1: Obtener Clima
```vue
<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()

async function fetchWeather() {
  await weatherStore.$getWeatherByCityName('México')
  console.log(weatherStore.weatherData)
}
</script>

<template>
  <div>
    <button @click="fetchWeather">Obtener Clima</button>
    <div v-if="weatherStore.loading">Cargando...</div>
    <div v-if="weatherStore.error" class="error">{{ weatherStore.error }}</div>
    <div v-if="weatherStore.weatherData">
      <p>{{ weatherStore.weatherData.name }}: {{ weatherStore.weatherData.main.temp }}°C</p>
    </div>
  </div>
</template>
```

### Ejemplo 2: Obtener Noticias
```vue
<script setup lang="ts">
import { useNewsStore } from '@/stores/news'

const newsStore = useNewsStore()

async function fetchNews() {
  await newsStore.$getTopHeadlines('es')
}
</script>

<template>
  <div>
    <button @click="fetchNews">Obtener Noticias</button>
    <div v-if="newsStore.loading">Cargando...</div>
    <div v-for="article in newsStore.newsList" :key="article.url" class="news-item">
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>
    </div>
  </div>
</template>
```

### Ejemplo 3: Obtener Datos (Usuarios, Posts, Comentarios)
```vue
<script setup lang="ts">
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

async function fetchUsers() {
  await dataStore.$getUsers()
}

async function fetchPosts() {
  await dataStore.$getPosts()
}
</script>

<template>
  <div>
    <button @click="fetchUsers">Obtener Usuarios</button>
    <button @click="fetchPosts">Obtener Posts</button>
    
    <div v-if="dataStore.loading">Cargando...</div>
    
    <div>
      <h3>Usuarios</h3>
      <ul>
        <li v-for="user in dataStore.users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
    
    <div>
      <h3>Posts</h3>
      <div v-for="post in dataStore.posts" :key="post.id" class="post-item">
        <h4>{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>
```

---

## Almacenamiento Local
Todos los datos obtenidos se guardan automáticamente en `localStorage`:
- Weather: `weatherData`
- News: `newsList`
- Data: `users`, `posts`, `comments`

Para limpiar el almacenamiento local, usa las funciones `$clear*()` de cada store.

---

## Agregando Nuevas APIs

Para agregar una nueva API, sigue estos pasos:

1. **Crear archivo Axios** en `src/axios/`:
```typescript
import axios from 'axios';

const axiosMyAPI = axios.create({
  baseURL: 'https://api-endpoint.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosMyAPI;
```

2. **Crear archivo Store** en `src/stores/`:
```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosMyAPI from '../axios/axiosMyAPI'

export const useMyAPIStore = defineStore('myapi', () => {
    const data = ref(localStorage.getItem('myAPIData') ? JSON.parse(localStorage.getItem('myAPIData')!) : null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    function $fetchData() {
        loading.value = true
        error.value = null
        return axiosMyAPI.get('endpoint')
            .then(response => {
                data.value = response.data
                localStorage.setItem('myAPIData', JSON.stringify(data.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
            })
            .finally(() => {
                loading.value = false
            })
    }

    return { data, loading, error, $fetchData }
})
```

3. **Usar en componentes:**
```vue
<script setup lang="ts">
import { useMyAPIStore } from '@/stores/myapi'

const myAPIStore = useMyAPIStore()
await myAPIStore.$fetchData()
</script>
```

---

## Manejo de Errores
Todos los stores incluyen:
- `loading` - Indica si está cargando
- `error` - Mensaje de error si algo falla

Úsalos en tus plantillas:
```vue
<div v-if="store.loading">Cargando...</div>
<div v-if="store.error" class="alert-error">{{ store.error }}</div>
<div v-if="!store.loading && !store.error"><!-- mostrar datos --></div>
```
