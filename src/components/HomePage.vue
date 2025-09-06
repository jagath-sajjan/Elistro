<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useListingsStore } from '../stores/listings'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const listingsStore = useListingsStore()

const { user, isAuthenticated } = storeToRefs(authStore)
const { listings, categories } = storeToRefs(listingsStore)
const { fetchListings, setSelectedCategory } = listingsStore

const searchQuery = ref('')

onMounted(async () => {
  try {
    await fetchListings()
  } catch (error) {
    console.error('Failed to fetch listings:', error)
    // App will still work even if API call fails
  }
})

const handleSearch = () => {
  router.push({
    path: '/product-listing',
    query: { search: searchQuery.value }
  })
}

const selectCategory = (category: string) => {
  setSelectedCategory(category)
  router.push('/product-listing')
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="container mx-auto border-b-4 border-gray-900 py-4 px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h1 class="text-4xl font-bold">Elistro</h1>
        </div>
        
        <nav class="flex flex-wrap gap-4 items-center">
          <router-link to="/product-listing" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Discover</router-link>
          <router-link v-if="isAuthenticated" to="/add-product" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Sell</router-link>
            <router-link v-if="isAuthenticated" to="/purchases" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Purchases</router-link>
          <router-link v-if="isAuthenticated" to="/cart" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Cart</router-link>
            <router-link v-if="isAuthenticated" to="/profile" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Profile</router-link>
          <router-link v-if="!isAuthenticated" to="/login" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Log in</router-link>
            <router-link v-if="!isAuthenticated" to="/signup" class="px-4 py-2 border-2 border-gray-900 bg-blue-500 text-white hover:bg-blue-600 font-medium">Start selling</router-link>
          <button v-if="isAuthenticated" @click="logout" class="px-4 py-2 border-2 border-gray-900 bg-red-500 text-white hover:bg-red-600 font-medium">Logout</button>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <!-- Hero Section -->
      <div class="border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8 mb-12">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 slide-up">Go from 0 to $1</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl slide-up animation-delay-100">
          Anyone can earn their first dollar online. Just start with what you know, 
          see what sticks, and get paid. It's that easy.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 slide-up animation-delay-200">
          <router-link to="/signup" class="px-8 py-4 border-2 border-gray-900 bg-blue-500 text-white text-xl font-medium">
            Start selling
          </router-link>
          
          <form @submit.prevent="handleSearch" class="flex-grow flex">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search marketplace..." 
              class="border-2 border-gray-900 p-3 flex-grow text-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
            <button type="submit" class="px-6 py-2 border-2 border-gray-900 bg-black text-white text-xl font-medium">
              Search
            </button>
          </form>
        </div>
      </div>

    <!-- Features Section -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 border-b-4 border-gray-900 pb-2">Explore Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div 
          v-for="category in categories" 
          :key="category" 
          @click="selectCategory(category)"
          class="border-2 border-gray-900 p-4 bg-white text-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div class="text-4xl mb-2">
            {{ 
              category === 'Electronics' ? '📱' : 
              category === 'Clothing' ? '👕' : 
              category === 'Home' ? '🏠' : 
              category === 'Books' ? '📚' : 
              category === 'Sports' ? '⚽' : '📦' 
            }}
          </div>
          <h3 class="font-bold">{{ category }}</h3>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 border-b-4 border-gray-900 pb-2">Featured Products</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="listing in listings.slice(0, 6)" 
          :key="listing.id" 
          class="neubrutalist-card p-4 cursor-pointer hover:translate-y-[-4px] transition-transform"
          @click="router.push(`/product/${listing.id}`)"
        >
          <div class="aspect-square bg-gray-200 mb-4">
            <img 
              :src="listing.imageUrl" 
              :alt="listing.title" 
              class="w-full h-full object-cover"
            >
          </div>
          
          <h3 class="text-xl font-bold mb-2">{{ listing.title }}</h3>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">${{ listing.price.toFixed(2) }}</span>
            <span class="text-sm bg-gray-200 px-2 py-1 rounded-md">{{ listing.category }}</span>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <router-link to="/product-listing" class="px-4 py-2 border-2 border-gray-900 bg-blue-500 text-white inline-block font-medium">
          View All Products
        </router-link>
      </div>
    </section>

    <!-- How It Works -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 border-b-4 border-gray-900 pb-2">How It Works</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="border-2 border-gray-900 p-6 bg-white text-center">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-xl font-bold mb-2">Find</h3>
          <p>Discover unique second-hand items from sellers around the world.</p>
        </div>
        
        <div class="border-2 border-gray-900 p-6 bg-white text-center">
          <div class="text-5xl mb-4">💰</div>
          <h3 class="text-xl font-bold mb-2">Buy</h3>
          <p>Purchase items securely through our simple checkout process.</p>
        </div>
        
        <div class="border-2 border-gray-900 p-6 bg-white text-center">
          <div class="text-5xl mb-4">♻️</div>
          <h3 class="text-xl font-bold mb-2">Sustain</h3>
          <p>Support sustainability by giving pre-loved items a second life.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="border-4 border-gray-900 border-t-4 py-8 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="mb-6 md:mb-0">
          <h2 class="text-3xl font-bold">Elistro</h2>
          <p class="text-gray-600">Sustainable second-hand marketplace</p>
        </div>
        
        <div class="flex gap-4">
          <a href="#" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">About</a>
          <a href="#" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Contact</a>
          <a href="#" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Terms</a>
          <a href="#" class="px-4 py-2 border-2 border-gray-900 bg-white hover:bg-gray-100 font-medium">Privacy</a>
        </div>
      </div>
      
      <div class="text-center text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} Elistro. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
</template>

<style scoped>
.homepage {
  min-height: 100vh;
  background-color: #fafafa;
  position: relative;
  overflow-x: hidden;
}

/* Header Styles */
.header {
  background-color: #000;
  color: white;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(90deg, 
    #8B5CF6 0%,     /* Purple for E */
    #EC4899 16.66%, /* Pink for l */
    #F97316 33.33%, /* Orange for i */
    #F97316 50%,    /* Orange for s */
    #10B981 66.66%, /* Green for t */
    #10B981 83.33%, /* Green for r */
    #06B6D4 100%    /* Teal for o */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}


.navigation {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ccc;
}

.nav-link.active {
  background-color: white;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.cta-button {
  background-color: #ff6b9d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #ff5a8a;
}

/* Main Content */
.main-content {
  position: relative;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}


/* Hero Section */
.hero-section {
  position: relative;
  z-index: 10;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  color: #000;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #333;
  margin: 0 0 3rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.primary-button, .secondary-button {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.primary-button {
  background-color: #000;
  color: white;
}

.primary-button:hover {
  background-color: #333;
}

.secondary-button {
  background-color: #000;
  color: white;
}

.secondary-button:hover {
  background-color: #333;
}

.search-icon {
  width: 20px;
  height: 20px;
}

/* Features Section */
.features-section {
  padding: 4rem 2rem;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin: 0 0 3rem 0;
  position: relative;
  z-index: 1;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.5rem;
  padding: 3rem 0;
  max-width: 1000px;
  margin: 0 auto;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.feature-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 3px solid transparent;
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(15px);
  opacity: 0.9;
  transform: translateY(0px) scale(1);
  animation: breathe 6s ease-in-out infinite;
  will-change: transform, box-shadow, opacity;
}

.feature-card:hover {
  transform: translateY(-20px) scale(1.03) rotateY(2deg);
  box-shadow: 0 25px 80px rgba(255, 107, 157, 0.2);
  border-color: #ff6b9d;
  opacity: 1;
  z-index: 20;
  background: linear-gradient(135deg, #ffffff 0%, #fef7ff 100%);
  animation: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.features-grid:hover .feature-card:not(:hover) {
  opacity: 0.5;
  transform: scale(0.98) translateY(3px);
  filter: blur(0.3px);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes breathe {
  0%, 100% { 
    transform: translateY(0px) scale(1);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }
  25% { 
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 14px 45px rgba(0, 0, 0, 0.1);
  }
  50% { 
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.12);
  }
  75% { 
    transform: translateY(-2px) scale(1.005);
    box-shadow: 0 14px 45px rgba(0, 0, 0, 0.1);
  }
}

/* Enhanced pseudo-random positioning with breathing animation */
.card-1 {
  animation-delay: 0s;
}

.card-2 {
  animation-delay: 0.8s;
}

.card-3 {
  animation-delay: 1.6s;
}

.card-4 {
  animation-delay: 2.4s;
}

.card-5 {
  animation-delay: 3.2s;
}

.card-6 {
  animation-delay: 4s;
}

.card-7 {
  animation-delay: 4.8s;
}

.card-8 {
  animation-delay: 5.6s;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.feature-card p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 1rem 0;
    gap: 1rem;
  }
  
  .navigation {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  
  .main-content {
    padding: 2rem 1rem;
  }
  
  .features-section {
    padding: 2rem 1rem;
  }
  
  .features-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
    max-width: 800px;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .primary-button, .secondary-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .features-title {
    font-size: 1.75rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 0;
    max-width: 600px;
  }
  
  .feature-card {
    padding: 2rem 1.2rem;
  }
  
  .feature-icon {
    font-size: 2rem;
  }
}
</style>

