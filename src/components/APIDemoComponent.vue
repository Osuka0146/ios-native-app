<template>
  <div class="api-demo-container">
    <h1>Demo de Consumo de APIs</h1>

    <!-- Sección Weather -->
    <section class="api-section">
      <h2>🌤️ Clima (OpenWeatherMap)</h2>
      <div class="input-group">
        <input
          v-model="citySearch"
          type="text"
          placeholder="Ingresa una ciudad"
          @keyup.enter="getWeather"
        />
        <button @click="getWeather" :disabled="weatherStore.loading">
          {{ weatherStore.loading ? 'Cargando...' : 'Buscar Clima' }}
        </button>
      </div>
      <div v-if="weatherStore.error" class="error-message">
        ❌ Error: {{ weatherStore.error }}
      </div>
      <div v-if="weatherStore.weatherData" class="weather-card">
        <h3>{{ weatherStore.weatherData.name }}</h3>
        <p><strong>Temperatura:</strong> {{ weatherStore.weatherData.main.temp }}°C</p>
        <p><strong>Sensación térmica:</strong> {{ weatherStore.weatherData.main.feels_like }}°C</p>
        <p><strong>Humedad:</strong> {{ weatherStore.weatherData.main.humidity }}%</p>
        <p><strong>Descripción:</strong> {{ weatherStore.weatherData.weather[0].description }}</p>
      </div>
    </section>

    <!-- Sección Noticias -->
    <section class="api-section">
      <h2>📰 Noticias (NewsAPI)</h2>
      <div class="input-group">
        <input
          v-model="newsSearch"
          type="text"
          placeholder="Buscar noticias..."
          @keyup.enter="searchNews"
        />
        <button @click="getTopHeadlines" :disabled="newsStore.loading">
          {{ newsStore.loading ? 'Cargando...' : 'Titulares' }}
        </button>
        <button @click="searchNews" :disabled="newsStore.loading">
          {{ newsStore.loading ? 'Cargando...' : 'Buscar' }}
        </button>
      </div>
      <div v-if="newsStore.error" class="error-message">
        ❌ Error: {{ newsStore.error }}
      </div>
      <div v-if="newsStore.newsList.length > 0" class="news-list">
        <div v-for="article in newsStore.newsList.slice(0, 5)" :key="article.url" class="news-card">
          <h4>{{ article.title }}</h4>
          <p>{{ article.description }}</p>
          <small>📅 {{ formatDate(article.publishedAt) }}</small>
          <a :href="article.url" target="_blank" class="read-more">Leer más →</a>
        </div>
      </div>
    </section>

    <!-- Sección Usuarios y Posts -->
    <section class="api-section">
      <h2>👥 Usuarios y Posts (JSONPlaceholder)</h2>
      <div class="button-group">
        <button @click="getAllUsers" :disabled="dataStore.loading">
          {{ dataStore.loading ? 'Cargando...' : 'Obtener Usuarios' }}
        </button>
        <button @click="getAllPosts" :disabled="dataStore.loading">
          {{ dataStore.loading ? 'Cargando...' : 'Obtener Posts' }}
        </button>
      </div>

      <div v-if="dataStore.error" class="error-message">
        ❌ Error: {{ dataStore.error }}
      </div>

      <!-- Lista de Usuarios -->
      <div v-if="dataStore.users.length > 0">
        <h3>Usuarios:</h3>
        <div class="users-list">
          <div
            v-for="user in dataStore.users.slice(0, 5)"
            :key="user.id"
            class="user-card"
            @click="getUserPosts(user.id)"
          >
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }}</p>
            <small>{{ user.phone }}</small>
          </div>
        </div>
      </div>

      <!-- Lista de Posts -->
      <div v-if="dataStore.posts.length > 0">
        <h3>Posts:</h3>
        <div class="posts-list">
          <div
            v-for="post in dataStore.posts.slice(0, 5)"
            :key="post.id"
            class="post-card"
            @click="getPostComments(post.id)"
          >
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>

      <!-- Lista de Comentarios -->
      <div v-if="dataStore.comments.length > 0">
        <h3>Comentarios:</h3>
        <div class="comments-list">
          <div v-for="comment in dataStore.comments.slice(0, 5)" :key="comment.id" class="comment-card">
            <strong>{{ comment.name }}</strong>
            <p>{{ comment.body }}</p>
            <small>Por: {{ comment.email }}</small>
          </div>
        </div>
      </div>
    </section>

    <!-- Estado de Caché -->
    <section class="api-section cache-info">
      <h2>💾 Información de Caché</h2>
      <div class="cache-stats">
        <div>
          <strong>Clima guardado:</strong>
          {{ weatherStore.weatherData ? '✅ Sí' : '❌ No' }}
        </div>
        <div>
          <strong>Noticias guardadas:</strong>
          {{ newsStore.newsList.length }} artículos
        </div>
        <div>
          <strong>Usuarios guardados:</strong>
          {{ dataStore.users.length }} usuarios
        </div>
        <div>
          <strong>Posts guardados:</strong>
          {{ dataStore.posts.length }} posts
        </div>
      </div>
      <button @click="clearAllCache" class="danger-btn">Limpiar Todo el Caché</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { useNewsStore } from '@/stores/news'
import { useDataStore } from '@/stores/data'

const weatherStore = useWeatherStore()
const newsStore = useNewsStore()
const dataStore = useDataStore()

const citySearch = ref('')
const newsSearch = ref('')

async function getWeather() {
  if (citySearch.value.trim()) {
    await weatherStore.$getWeatherByCityName(citySearch.value)
  }
}

async function getTopHeadlines() {
  await newsStore.$getTopHeadlines('mx')
}

async function searchNews() {
  if (newsSearch.value.trim()) {
    await newsStore.$searchNews(newsSearch.value)
  }
}

async function getAllUsers() {
  await dataStore.$getUsers()
}

async function getAllPosts() {
  await dataStore.$getPosts()
}

async function getUserPosts(userId: number) {
  await dataStore.$getPosts(userId)
}

async function getPostComments(postId: number) {
  await dataStore.$getComments(postId)
}

function clearAllCache() {
  weatherStore.$clearWeatherData()
  newsStore.$clearNews()
  dataStore.$clearAllData()
  alert('✅ Caché limpiado')
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-ES')
}
</script>

<style scoped>
.api-demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.api-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #007bff;
}

.api-section h2 {
  color: #007bff;
  margin-top: 0;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.input-group input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.input-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.danger-btn {
  background: #dc3545;
}

.danger-btn:hover {
  background: #c82333;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.weather-card {
  background: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-card h3 {
  margin-top: 0;
  color: #333;
}

.weather-card p {
  margin: 8px 0;
  color: #666;
}

.news-list,
.users-list,
.posts-list,
.comments-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.news-card,
.user-card,
.post-card,
.comment-card {
  background: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover,
.user-card:hover,
.post-card:hover,
.comment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.news-card h4,
.user-card h4,
.post-card h4,
.comment-card strong {
  margin-top: 0;
  color: #007bff;
}

.news-card p,
.user-card p,
.post-card p,
.comment-card p {
  color: #666;
  font-size: 14px;
  margin: 8px 0;
}

.news-card small,
.user-card small,
.comment-card small {
  color: #999;
  font-size: 12px;
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

.cache-info {
  border-left-color: #28a745;
}

.cache-info h2 {
  color: #28a745;
}

.cache-stats {
  background: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.cache-stats div {
  padding: 8px 0;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.cache-stats div:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .news-list,
  .users-list,
  .posts-list,
  .comments-list {
    grid-template-columns: 1fr;
  }

  .input-group,
  .button-group {
    flex-direction: column;
  }

  .input-group button,
  .button-group button {
    width: 100%;
  }
}
</style>
