import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosNews from '../axios/axiosNews'

export const useNewsStore = defineStore('news', () => {
    const newsList = ref(localStorage.getItem('newsList') ? JSON.parse(localStorage.getItem('newsList')!) : [])
    const loading = ref(false)
    const error = ref<string | null>(null)

    function $getTopHeadlines(country: string = 'mx') {
        loading.value = true
        error.value = null
        return axiosNews.get('top-headlines', {
            params: {
                country: country
            }
        })
            .then(response => {
                newsList.value = response.data.articles
                localStorage.setItem('newsList', JSON.stringify(newsList.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching news data:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $searchNews(query: string) {
        loading.value = true
        error.value = null
        return axiosNews.get('everything', {
            params: {
                q: query,
                sortBy: 'publishedAt'
            }
        })
            .then(response => {
                newsList.value = response.data.articles
                localStorage.setItem('newsList', JSON.stringify(newsList.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error searching news:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $clearNews() {
        newsList.value = []
        localStorage.removeItem('newsList')
    }

    return { newsList, loading, error, $getTopHeadlines, $searchNews, $clearNews }
})
