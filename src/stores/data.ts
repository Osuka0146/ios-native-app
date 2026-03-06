import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosJsonPlaceholder from '../axios/axiosJsonPlaceholder'

export const useDataStore = defineStore('data', () => {
    const users = ref(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')!) : [])
    const posts = ref(localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')!) : [])
    const comments = ref(localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')!) : [])
    const loading = ref(false)
    const error = ref<string | null>(null)

    function $getUsers() {
        loading.value = true
        error.value = null
        return axiosJsonPlaceholder.get('users')
            .then(response => {
                users.value = response.data
                localStorage.setItem('users', JSON.stringify(users.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching users:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $getPosts(userId?: number) {
        loading.value = true
        error.value = null
        const url = userId ? `posts?userId=${userId}` : 'posts'
        return axiosJsonPlaceholder.get(url)
            .then(response => {
                posts.value = response.data
                localStorage.setItem('posts', JSON.stringify(posts.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching posts:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $getComments(postId?: number) {
        loading.value = true
        error.value = null
        const url = postId ? `comments?postId=${postId}` : 'comments'
        return axiosJsonPlaceholder.get(url)
            .then(response => {
                comments.value = response.data
                localStorage.setItem('comments', JSON.stringify(comments.value))
                return response.data
            })
            .catch(errorResponse => {
                error.value = errorResponse.message
                console.error('Error fetching comments:', errorResponse)
            })
            .finally(() => {
                loading.value = false
            })
    }

    function $clearAllData() {
        users.value = []
        posts.value = []
        comments.value = []
        localStorage.removeItem('users')
        localStorage.removeItem('posts')
        localStorage.removeItem('comments')
    }

    return { users, posts, comments, loading, error, $getUsers, $getPosts, $getComments, $clearAllData }
})
