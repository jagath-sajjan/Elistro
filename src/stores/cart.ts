import { defineStore } from 'pinia'
import api from '../services/api'
import { Listing } from './listings'

interface CartItem {
  id: string
  listing: Listing
  quantity: number
}

interface CartState {
  items: CartItem[]
  loading: boolean
  error: string | null
  processingPurchase: boolean
  purchaseSuccess: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false,
    error: null,
    processingPurchase: false,
    purchaseSuccess: false
  }),
  
  getters: {
    cartCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.listing.price * item.quantity)
      }, 0)
    },
    
    hasItems: (state) => state.items.length > 0
  },
  
  actions: {
    async fetchCart() {
      if (!localStorage.getItem('token')) return
      
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/api/cart')
        
        this.items = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch cart'
      } finally {
        this.loading = false
      }
    },
    
    async addToCart(listing: Listing, quantity: number = 1) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/api/cart/add', {
          listingId: listing.id,
          quantity
        })
        
        // Check if the item is already in the cart
        const existingItem = this.items.find(item => item.listing.id === listing.id)
        
        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          this.items.push({
            id: response.data.id,
            listing,
            quantity
          })
        }
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to add item to cart'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async removeFromCart(itemId: string) {
      this.loading = true
      this.error = null
      
      try {
        await api.delete(`/api/cart/${itemId}`)
        
        // Remove the item from the cart
        this.items = this.items.filter(item => item.id !== itemId)
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to remove item from cart'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateQuantity(itemId: string, quantity: number) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId)
      }
      
      this.loading = true
      this.error = null
      
      try {
        await api.put(`/api/cart/${itemId}`, {
          quantity
        })
        
        // Update the quantity in the cart
        const item = this.items.find(item => item.id === itemId)
        if (item) {
          item.quantity = quantity
        }
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update quantity'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async clearCart() {
      this.loading = true
      this.error = null
      
      try {
        await api.delete('/api/cart')
        
        // Clear the cart
        this.items = []
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to clear cart'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async processPurchase() {
      if (!this.hasItems) return false
      
      this.processingPurchase = true
      this.purchaseSuccess = false
      this.error = null
      
      try {
        await api.post('/api/purchase', {})
        
        // Simulate processing delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Clear the cart after successful purchase
        this.items = []
        this.purchaseSuccess = true
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to process purchase'
        throw error
      } finally {
        this.processingPurchase = false
      }
    },
    
    resetPurchaseState() {
      this.purchaseSuccess = false
      this.error = null
    }
  }
})