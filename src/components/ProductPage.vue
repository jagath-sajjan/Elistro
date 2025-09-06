<template>
  <div class="product-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <h1 class="logo-text">Elistro</h1>
        </div>

        <!-- Shopping Cart -->
        <router-link to="/product-listing" class="cart-icon">
          <svg class="cart-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
          <div class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</div>
        </router-link>

        <!-- User Profile -->
        <router-link to="/profile" class="profile-icon">
          <svg class="profile-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </router-link>
      </div>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <button class="breadcrumb-btn">Product Page</button>
    </div>

    <!-- Product Image Section -->
    <section class="product-image-section">
      <div class="image-container">
        <!-- Navigation Arrows -->
        <button class="nav-arrow nav-arrow-left" @click="previousImage" :disabled="currentImageIndex === 0">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button class="nav-arrow nav-arrow-right" @click="nextImage" :disabled="currentImageIndex === productImages.length - 1">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>

        <!-- Main Product Image -->
        <div class="product-image">
          <div class="image-placeholder">
            {{ productImages[currentImageIndex].emoji }}
          </div>
          
          <!-- Product Tags -->
          <div class="product-tags">
            <span class="tag tag-brown">{{ productImages[currentImageIndex].tag1 }}</span>
            <span class="tag tag-green">{{ productImages[currentImageIndex].tag2 }}</span>
          </div>
        </div>
      </div>

      <!-- Image Pagination Dots -->
      <div class="pagination-dots">
        <button 
          v-for="(image, index) in productImages" 
          :key="index"
          class="dot"
          :class="{ active: index === currentImageIndex }"
          @click="goToImage(index)"
        ></button>
      </div>
    </section>

    <!-- Product Description Section -->
    <section class="product-description-section">
      <div class="product-info">
        <h1 class="product-title">{{ product.title }}</h1>
        <div class="product-price">${{ product.price }}</div>
        <div class="product-meta">
          <span class="product-location">📍 {{ product.location }}</span>
          <span class="product-time">⏰ {{ product.time }}</span>
        </div>
      </div>

      <div class="product-description">
        <h3>Product Description</h3>
        <p>{{ product.description }}</p>
        <p>It should contain all the required field information about this amazing product. This includes detailed specifications, condition, and any additional features that make this item special.</p>
        
        <div class="product-specs">
          <h4>Specifications:</h4>
          <ul>
            <li>Condition: {{ product.condition }}</li>
            <li>Brand: {{ product.brand }}</li>
            <li>Category: {{ product.category }}</li>
            <li>Seller: {{ product.seller }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Add to Cart Button -->
    <div class="add-to-cart-section">
      <button class="add-to-cart-btn" @click="addToCart">
        <svg class="cart-icon-btn" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
        </svg>
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Component state
const cartCount = ref(1)
const currentImageIndex = ref(0)

// Product data
const product = reactive({
  title: 'Vintage Camera Collection',
  price: 89,
  location: 'Downtown',
  time: '2 hours ago',
  condition: 'Excellent',
  brand: 'Canon',
  category: 'Electronics',
  seller: 'John Doe',
  description: 'This beautiful vintage camera is in excellent condition and perfect for photography enthusiasts. It comes with original lens and carrying case.'
})

// Product images with tags
const productImages = reactive([
  { emoji: '📷', tag1: 'Cool Cod', tag2: 'Sophisticated Kingfisher' },
  { emoji: '📸', tag1: 'Polarized Zebra', tag2: 'Joyous' },
  { emoji: '🎥', tag1: 'Sync', tag2: 'Ungana' },
  { emoji: '📹', tag1: 'Vintage', tag2: 'Classic' },
  { emoji: '🔍', tag1: 'Lens', tag2: 'Focus' }
])

// Methods
const toggleCart = () => {
  console.log('Cart toggled')
}

const toggleProfile = () => {
  console.log('Profile toggled')
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < productImages.length - 1) {
    currentImageIndex.value++
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

const addToCart = () => {
  cartCount.value++
  console.log('Added to cart:', product.title)
  // Show success message or animation
}
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 100px; /* Space for add to cart button */
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

/* Breadcrumb */
.breadcrumb {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.breadcrumb-btn {
  background-color: #f3f4f6;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #6b7280;
  cursor: pointer;
}

/* Product Image Section */
.product-image-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  aspect-ratio: 1;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-placeholder {
  font-size: 4rem;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  z-index: 10;
}

.nav-arrow:hover:not(:disabled) {
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow-left {
  left: 1rem;
}

.nav-arrow-right {
  right: 1rem;
}

.nav-arrow svg {
  width: 20px;
  height: 20px;
  color: #374151;
}

/* Product Tags */
.product-tags {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.tag-brown {
  background-color: #92400e;
}

.tag-green {
  background-color: #065f46;
}

/* Pagination Dots */
.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
}

.dot.active {
  background-color: #ff6b9d;
  transform: scale(1.2);
}

.dot:hover {
  background-color: #9ca3af;
}

/* Product Description Section */
.product-description-section {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.product-info {
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff6b9d;
  margin: 0 0 1rem 0;
}

.product-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.product-description {
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-description h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1rem 0;
}

.product-description p {
  color: #374151;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.product-specs {
  margin-top: 1.5rem;
}

.product-specs h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.product-specs ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #374151;
}

.product-specs li {
  margin-bottom: 0.25rem;
}

/* Add to Cart Section */
.add-to-cart-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  z-index: 100;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.cart-icon-btn {
  width: 20px;
  height: 20px;
}

/* Responsive Design */
@media (min-width: 768px) {
  .header-content,
  .breadcrumb,
  .product-image-section,
  .product-description-section,
  .add-to-cart-section {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .header-content,
  .breadcrumb,
  .product-image-section,
  .product-description-section,
  .add-to-cart-section {
    max-width: 1024px;
  }
}
</style>
