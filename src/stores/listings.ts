import { defineStore } from 'pinia'
import api from '../services/api'

export interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  imageUrl: string
  sellerId: string
  createdAt: string
}

interface ListingsState {
  listings: Listing[]
  currentListing: Listing | null
  loading: boolean
  error: string | null
  categories: string[]
  searchQuery: string
  selectedCategory: string | null
}

export const useListingsStore = defineStore('listings', {
  state: (): ListingsState => ({
    listings: [],
    currentListing: null,
    loading: false,
    error: null,
    categories: ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Other'],
    searchQuery: '',
    selectedCategory: null
  }),
  
  getters: {
    filteredListings: (state) => {
      let filtered = [...state.listings]
      
      // Filter by category if selected
      if (state.selectedCategory) {
        filtered = filtered.filter(listing => listing.category === state.selectedCategory)
      }
      
      // Filter by search query if provided
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(listing => 
          listing.title.toLowerCase().includes(query) || 
          listing.description.toLowerCase().includes(query)
        )
      }
      
      return filtered
    }
  },
  
  actions: {
    async fetchListings() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/api/listings')
        this.listings = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch listings'
      } finally {
        this.loading = false
      }
    },
    
    async fetchListingById(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/api/listings/${id}`)
        this.currentListing = response.data
        return this.currentListing
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch listing'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async createListing(listingData: Omit<Listing, 'id' | 'sellerId' | 'createdAt'>) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/api/listings', listingData)
        
        // Add the new listing to the store
        this.listings.push(response.data)
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create listing'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateListing(id: string, listingData: Partial<Listing>) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put(`/listings/${id}`, listingData)
        
        // Update the listing in the store
        const index = this.listings.findIndex(listing => listing.id === id)
        if (index !== -1) {
          this.listings[index] = response.data
        }
        
        if (this.currentListing?.id === id) {
          this.currentListing = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update listing'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteListing(id: string) {
      this.loading = true
      this.error = null
      
      try {
        await api.delete(`/listings/${id}`)
        
        // Remove the listing from the store
        this.listings = this.listings.filter(listing => listing.id !== id)
        
        if (this.currentListing?.id === id) {
          this.currentListing = null
        }
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete listing'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    
    setSelectedCategory(category: string | null) {
      this.selectedCategory = category
    }
  }
})