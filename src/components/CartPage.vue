<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const router = useRouter()
const cartStore = useCartStore()
const { items, loading, processingPurchase, purchaseSuccess, error } = storeToRefs(cartStore)
const { fetchCart, updateQuantity, removeFromCart, processPurchase, resetPurchaseState } = cartStore

const cartTotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + (item.listing.price * item.quantity)
  }, 0)
})

const isCartEmpty = computed(() => items.value.length === 0)

// Animation states
const showProcessingAnimation = ref(false)
const showSuccessAnimation = ref(false)

onMounted(async () => {
  await fetchCart()
})

const handleUpdateQuantity = async (itemId: string, quantity: number) => {
  if (quantity < 1) return
  await updateQuantity(itemId, quantity)
}

const handleRemoveItem = async (itemId: string) => {
  await removeFromCart(itemId)
}

const handleCheckout = async () => {
  if (isCartEmpty.value) return
  
  showProcessingAnimation.value = true
  
  try {
    await processPurchase()
    
    // Show success animation after processing
    showProcessingAnimation.value = false
    showSuccessAnimation.value = true
    
    // Redirect to purchases page after a delay
    setTimeout(() => {
      showSuccessAnimation.value = false
      router.push('/purchases')
    }, 2000)
  } catch (err) {
    showProcessingAnimation.value = false
    console.error('Purchase failed:', err)
  }
}

const continueShopping = () => {
  router.push('/product-listing')
}
</script>

<template>
  <div class="neubrutalist-container p-4 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 border-b-4 border-gray-900 pb-2">Your Cart</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-40">
      <div class="animate-pulse text-xl">Loading cart...</div>
    </div>
    
    <div v-else-if="isCartEmpty && !purchaseSuccess" class="text-center py-10">
      <div class="text-2xl mb-4">Your cart is empty</div>
      <button @click="continueShopping" class="neubrutalist-button bg-blue-500 text-white">
        Continue Shopping
      </button>
    </div>
    
    <div v-else-if="!showProcessingAnimation && !showSuccessAnimation" class="space-y-6">
      <div v-for="item in items" :key="item.id" class="neubrutalist-card p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div class="w-full md:w-24 h-24 bg-gray-200 flex-shrink-0">
          <img 
            :src="item.listing.imageUrl" 
            :alt="item.listing.title" 
            class="w-full h-full object-cover"
          >
        </div>
        
        <div class="flex-grow">
          <h3 class="text-xl font-bold">{{ item.listing.title }}</h3>
          <p class="text-gray-700">${{ item.listing.price.toFixed(2) }}</p>
        </div>
        
        <div class="flex items-center gap-2">
          <button 
            @click="handleUpdateQuantity(item.id, item.quantity - 1)" 
            class="neubrutalist-button bg-gray-200 px-3 py-1"
            :disabled="item.quantity <= 1"
          >
            -
          </button>
          
          <span class="text-xl font-bold">{{ item.quantity }}</span>
          
          <button 
            @click="handleUpdateQuantity(item.id, item.quantity + 1)" 
            class="neubrutalist-button bg-gray-200 px-3 py-1"
          >
            +
          </button>
        </div>
        
        <div class="text-xl font-bold">
          ${{ (item.listing.price * item.quantity).toFixed(2) }}
        </div>
        
        <button 
          @click="handleRemoveItem(item.id)" 
          class="neubrutalist-button bg-red-500 text-white"
        >
          Remove
        </button>
      </div>
      
      <div class="neubrutalist-card p-4 mt-8">
        <div class="flex justify-between items-center text-xl font-bold mb-4">
          <span>Total:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="handleCheckout" 
            class="neubrutalist-button bg-green-500 text-white"
            :disabled="isCartEmpty"
          >
            Checkout
          </button>
        </div>
      </div>
      
      <div v-if="error" class="text-red-500 mt-4">
        {{ error }}
      </div>
    </div>
    
    <!-- Processing Animation -->
    <div v-if="showProcessingAnimation" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div class="text-center">
        <div class="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 class="text-2xl font-bold">Processing your order...</h2>
        <p class="text-gray-600 mt-2">Please wait while we complete your purchase</p>
      </div>
    </div>
    
    <!-- Success Animation -->
    <div v-if="showSuccessAnimation" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 fade-in">
      <div class="text-center">
        <div class="w-24 h-24 rounded-full bg-green-500 mx-auto mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold slide-up">Purchase Successful!</h2>
        <p class="text-gray-600 mt-2 slide-up animation-delay-100">Thank you for your order</p>
      </div>
    </div>
  </div>
</template>