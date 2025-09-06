<template>
  <div class="product-listing-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo">Logo</h1>
        </div>
        
        <div class="cart-section">
          <div class="cart-icon">
            <svg class="cart-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <div class="user-profile">
            <div class="profile-circle"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Previous Purchases Title -->
    <div class="page-title">
      <h2>Previous Purchases</h2>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <div class="search-bar">
        <input type="text" placeholder="Search..." v-model="searchQuery">
      </div>
      <div class="filter-options">
        <button class="filter-button">Sort</button>
        <button class="filter-button">Filter</button>
        <button class="filter-button">Group by</button>
      </div>
    </div>

    <!-- Product List -->
    <div class="product-list">
      <div v-for="(product, index) in filteredProducts" :key="index" class="product-card">
        <div class="product-image"></div>
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }}</p>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-seller">{{ product.seller }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Sample product data
const products = ref([
  {
    id: 1,
    name: 'Product 1',
    price: '$19.99',
    category: 'Electronics',
    seller: 'Tech Store',
    image: '/path/to/product1.jpg'
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$29.99',
    category: 'Clothing',
    seller: 'Fashion Outlet',
    image: '/path/to/product2.jpg'
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$39.99',
    category: 'Home & Garden',
    seller: 'Home Essentials',
    image: '/path/to/product3.jpg'
  }
]);

const searchQuery = ref('');

// Filter products based on search query
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.seller.toLowerCase().includes(query)
  );
});

// Methods for sorting and filtering
const sortProducts = (criteria: string) => {
  // Logic to sort products
  console.log(`Sorting by ${criteria}`);
};

const filterProducts = (criteria: string) => {
  // Logic to filter products
  console.log(`Filtering by ${criteria}`);
};

const groupProducts = (criteria: string) => {
  // Logic to group products
  console.log(`Grouping by ${criteria}`);
};
</script>

<style scoped>
.product-listing-page {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.cart-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart-icon {
  cursor: pointer;
}

.cart-svg {
  width: 24px;
  height: 24px;
  fill: #fff;
}

.user-profile {
  cursor: pointer;
}

.profile-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  border: 2px solid #fff;
}

.page-title {
  margin-bottom: 20px;
}

.page-title h2 {
  font-size: 1.8rem;
  font-weight: normal;
}

.search-filter-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.search-bar input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #111;
  color: #fff;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-button {
  padding: 8px 15px;
  background-color: #111;
  border: 1px solid #333;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card {
  display: flex;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background-color: #111;
}

.product-image {
  width: 100px;
  height: 100px;
  background-color: #333;
  flex-shrink: 0;
}

.product-details {
  padding: 15px;
  flex-grow: 1;
}

.product-name {
  font-size: 1.2rem;
  margin: 0 0 5px 0;
}

.product-price,
.product-category,
.product-seller {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #ccc;
}
</style>