<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePurchasesStore } from '../stores/purchases'
import { storeToRefs } from 'pinia'

const router = useRouter()
const purchasesStore = usePurchasesStore()
const { purchases, loading, error } = storeToRefs(purchasesStore)
const { fetchPurchases } = purchasesStore

onMounted(async () => {
  await fetchPurchases()
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const goToProductPage = (productId: string) => {
  router.push(`/product/${productId}`)
}
</script>

<template>
  <div class="neubrutalist-container p-4 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 border-b-4 border-gray-900 pb-2">Your Purchases</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-pulse text-xl">Loading purchases...</div>
    </div>
    
    <div v-else-if="purchases.length === 0" class="text-center py-10">
      <div class="text-2xl mb-4">You haven't made any purchases yet</div>
      <button @click="router.push('/product-listing')" class="neubrutalist-button bg-blue-500 text-white">
        Browse Products
      </button>
    </div>
    
    <div v-else class="space-y-8">
      <div v-for="purchase in purchases" :key="purchase.id" class="neubrutalist-card p-4">
        <div class="border-b-2 border-gray-900 pb-2 mb-4">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">Order #{{ purchase.id.substring(0, 8) }}</h3>
            <span class="text-gray-600">{{ formatDate(purchase.purchaseDate) }}</span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span class="font-bold">Status: 
              <span :class="{
                'text-green-500': purchase.status === 'completed',
                'text-yellow-500': purchase.status === 'processing',
                'text-red-500': purchase.status === 'failed'
              }">
                {{ purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1) }}
              </span>
            </span>
            <span class="font-bold">Total: ${{ purchase.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="space-y-4">
          <div v-for="item in purchase.items" :key="item.id" class="flex flex-col md:flex-row items-start md:items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer" @click="goToProductPage(item.listing.id)">
            <div class="w-full md:w-16 h-16 bg-gray-200 flex-shrink-0">
              <img 
                :src="item.listing.imageUrl" 
                :alt="item.listing.title" 
                class="w-full h-full object-cover"
              >
            </div>
            
            <div class="flex-grow">
              <h4 class="font-bold">{{ item.listing.title }}</h4>
              <p class="text-sm text-gray-600">{{ item.listing.category }}</p>
            </div>
            
            <div class="text-gray-700">
              {{ item.quantity }} × ${{ item.price.toFixed(2) }}
            </div>
            
            <div class="font-bold">
              ${{ (item.quantity * item.price).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="error" class="text-red-500 mt-4">
      {{ error }}
    </div>
  </div>
</template>