import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosWeather from '../axios/axiosWeather'

export const useWeatherStore = defineStore('weather', () => {
    const weatherData = ref(localStorage.getItem('weatherData') ? JSON.parse(localStorage.getItem('weatherData')!) : null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    function $getWeatherByCityName(cityName: string) {
        loading.value = true
        error.value = null
        return axiosWeather.get('weather', {
            params: {
                q: cityName
            }
        })
            .then(response => {
                weatherData.value = response.data
                localStorage.setItem('weatherData', JSON.stringify(weatherData.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching weather data:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $getWeatherByCoordinates(lat: number, lon: number) {
        loading.value = true
        error.value = null
        return axiosWeather.get('weather', {
            params: {
                lat: lat,
                lon: lon
            }
        })
            .then(response => {
                weatherData.value = response.data
                localStorage.setItem('weatherData', JSON.stringify(weatherData.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching weather data:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $clearWeatherData() {
        weatherData.value = null
        localStorage.removeItem('weatherData')
    }

    return { weatherData, loading, error, $getWeatherByCityName, $getWeatherByCoordinates, $clearWeatherData }
})
