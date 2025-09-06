import { defineStore } from 'pinia'
import api from '../services/api'
import { Listing } from './listings'

export interface PurchaseItem {
  id: string
  listing: Listing
  quantity: number
  price: number
}

export interface Purchase {
  id: string
  items: PurchaseItem[]
  totalAmount: number
  purchaseDate: string
  status: 'completed' | 'processing' | 'failed'
}

interface PurchasesState {
  purchases: Purchase[]
  loading: boolean
  error: string | null
}

export const usePurchasesStore = defineStore('purchases', {
  state: (): PurchasesState => ({
    purchases: [],
    loading: false,
    error: null
  }),
  
  getters: {
    hasPurchases: (state) => state.purchases.length > 0,
    
    sortedPurchases: (state) => {
      return [...state.purchases].sort((a, b) => {
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      })
    }
  },
  
  actions: {
    async fetchPurchases() {
      if (!localStorage.getItem('token')) return
      
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/api/purchases')
        
        this.purchases = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch purchases'
      } finally {
        this.loading = false
      }
    },
    
    async fetchPurchaseById(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/api/purchases/${id}`)
        
        // Find and update the purchase in the store
        const index = this.purchases.findIndex(purchase => purchase.id === id)
        if (index !== -1) {
          this.purchases[index] = response.data
        } else {
          this.purchases.push(response.data)
        }
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch purchase'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})