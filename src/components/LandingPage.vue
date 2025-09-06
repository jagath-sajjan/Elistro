<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <!-- Hamburger Menu -->
        <button class="hamburger-menu" @click="toggleMenu">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </button>

        <!-- Logo -->
        <div class="logo">
          <h1 class="logo-text">Elistro</h1>
        </div>

        <!-- Right Side Icons -->
        <div class="header-icons">
          <!-- Shopping Cart -->
          <div class="cart-icon" @click="toggleCart">
            <svg class="cart-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
            </svg>
            <div class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</div>
          </div>

          <!-- User Profile -->
          <div class="profile-icon" @click="toggleProfile">
            <svg class="profile-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Search and Filter Section -->
    <section class="search-section">
      <div class="search-bar">
        <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search ..." 
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>

      <div class="filter-buttons">
        <button class="filter-btn" @click="toggleSort">
          <span>Sort</span>
          <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>
        <button class="filter-btn" @click="toggleFilter">
          <span>Filter</span>
          <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>
        <button class="filter-btn" @click="toggleGroupBy">
          <span>Group by</span>
          <svg class="dropdown-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Banner Section -->
    <section class="banner-section">
      <div class="banner-image">
        <div class="banner-content">
          <h2 class="banner-title">Discover Amazing Deals</h2>
          <p class="banner-subtitle">Find the best second-hand items in your area</p>
          <button class="banner-button">Shop Now</button>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <button class="all-categories-btn" @click="viewAllCategories">
        All Categories
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </button>
    </section>

    <!-- Products Grid -->
    <section class="products-section">
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="viewProduct(product)"
        >
          <div class="product-image">
            <div class="image-placeholder">{{ product.emoji }}</div>
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-price">${{ product.price }}</p>
            <div class="product-meta">
              <span class="product-location">{{ product.location }}</span>
              <span class="product-time">{{ product.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <div class="nav-item active">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span>Home</span>
      </div>
      <div class="nav-item">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>Favorites</span>
      </div>
      <div class="nav-item">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
        </svg>
        <span>Cart</span>
      </div>
      <div class="nav-item">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span>Profile</span>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Component state
const searchQuery = ref('')
const cartCount = ref(1)
const isMenuOpen = ref(false)
const isCartOpen = ref(false)
const isProfileOpen = ref(false)

// Sample products data
const products = reactive([
  { id: 1, title: 'Vintage Camera', price: 89, location: 'Downtown', time: '2h ago', emoji: '📷' },
  { id: 2, title: 'Designer Chair', price: 120, location: 'Midtown', time: '4h ago', emoji: '🪑' },
  { id: 3, title: 'Gaming Console', price: 250, location: 'Uptown', time: '1d ago', emoji: '🎮' },
  { id: 4, title: 'Art Collection', price: 75, location: 'East Side', time: '2d ago', emoji: '🎨' },
  { id: 5, title: 'Smartphone', price: 180, location: 'West Side', time: '3h ago', emoji: '📱' },
  { id: 6, title: 'Books Set', price: 35, location: 'Central', time: '5h ago', emoji: '📚' }
])

// Computed properties
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products
  return products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  console.log('Menu toggled:', isMenuOpen.value)
}

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
  console.log('Cart toggled:', isCartOpen.value)
}

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
  console.log('Profile toggled:', isProfileOpen.value)
}

const handleSearch = () => {
  console.log('Searching for:', searchQuery.value)
}

const toggleSort = () => {
  console.log('Sort options opened')
}

const toggleFilter = () => {
  console.log('Filter options opened')
}

const toggleGroupBy = () => {
  console.log('Group by options opened')
}

const viewAllCategories = () => {
  console.log('Viewing all categories')
}

const viewProduct = (product: any) => {
  console.log('Viewing product:', product.title)
  // Navigate to product page
  router.push('/product')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 80px; /* Space for bottom nav */
}

/* Header Styles */
.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: #374151;
  border-radius: 1px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
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
  margin: 0;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-icon, .profile-icon {
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-svg, .profile-svg {
  width: 24px;
  height: 24px;
  color: #374151;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Search Section */
.search-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.search-bar {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.search-bar input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-bar input:focus {
  outline: none;
  border-color: #ff6b9d;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #ff6b9d;
  color: #ff6b9d;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
}

/* Banner Section */
.banner-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.banner-image {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.banner-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.banner-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0 0 1.5rem 0;
}

.banner-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.banner-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* Categories Section */
.categories-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.all-categories-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: white;
  border: 2px solid #ff6b9d;
  border-radius: 12px;
  color: #ff6b9d;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.all-categories-btn:hover {
  background-color: #ff6b9d;
  color: white;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

/* Products Section */
.products-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.product-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-image {
  aspect-ratio: 1;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 2rem;
}

.product-info {
  padding: 1rem;
}

.product-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #ff6b9d;
  margin: 0 0 0.5rem 0;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item.active {
  color: #ff6b9d;
}

.nav-item:not(.active) {
  color: #6b7280;
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.nav-item span {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Responsive Design */
@media (min-width: 768px) {
  .header-content,
  .search-section,
  .banner-section,
  .categories-section,
  .products-section {
    max-width: 768px;
  }
  
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .header-content,
  .search-section,
  .banner-section,
  .categories-section,
  .products-section {
    max-width: 1024px;
  }
  
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
