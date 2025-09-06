import { defineStore } from 'pinia'
import api from '../services/api'

interface User {
  id: string | number
  email: string
  displayName: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
  }),
  
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    async signup(email: string, password: string, displayName: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/api/auth/signup', {
          email,
          password,
          displayName
        })
        
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        
        return user
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/api/auth/login', {
          email,
          password
        })
        
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        
        return user
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchUser() {
      if (!this.token) return
      
      this.loading = true
      
      try {
        const response = await api.get('/api/auth/profile')
        
        this.user = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch user'
        this.logout()
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
    
    async updateProfile(userData: Partial<User>) {
      if (!this.token || !this.user) return
      
      this.loading = true
      
      try {
        const response = await api.put('/api/auth/profile', userData)
        
        this.user = response.data
        return this.user
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update profile'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})