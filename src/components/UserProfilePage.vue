<template>
  <div class="profile-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo">Logo of the application</h1>
        </div>
        
        <div class="cart-section">
          <div class="cart-icon">
            <svg class="cart-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span class="cart-badge">1</span>
          </div>
          <div class="user-profile">
            <div class="profile-circle"></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Profile Card -->
      <div class="profile-card">
        <div class="profile-image-container">
          <div class="profile-image"></div>
          <button class="edit-button">Edit</button>
        </div>
        <div class="profile-info">
          <div class="profile-name">Brave Moose</div>
          <div class="profile-details">
            <div class="detail-item"></div>
            <div class="detail-item"></div>
            <div class="detail-item"></div>
          </div>
        </div>
      </div>

      <!-- Navigation Section -->
      <div class="navigation-section">
        <h2 class="section-title">Navigations</h2>
        <div class="navigation-buttons">
          <button class="nav-button">My listings</button>
          <button class="nav-button">My Purchases</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// User profile data
const userProfile = ref({
  name: 'Brave Moose',
  image: '/path/to/profile-image.jpg',
  listings: [],
  purchases: []
});

// Methods
const editProfile = () => {
  // Logic to edit profile
  console.log('Edit profile clicked');
};

const navigateToListings = () => {
  // Navigate to listings page
  console.log('Navigate to listings');
};

const navigateToPurchases = () => {
  // Navigate to purchases page
  console.log('Navigate to purchases');
};
</script>

<style scoped>
.profile-page {
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
  margin-bottom: 30px;
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
  position: relative;
  cursor: pointer;
}

.cart-svg {
  width: 24px;
  height: 24px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4081;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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

.main-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 1px solid #333;
  border-radius: 10px;
  margin-bottom: 20px;
}

.profile-image-container {
  position: relative;
  margin-bottom: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #333;
  border: 3px solid #fff;
}

.edit-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}

.profile-info {
  text-align: center;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-details {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.detail-item {
  width: 80px;
  height: 20px;
  background-color: #333;
  border-radius: 5px;
}

.navigation-section {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
}

.section-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fff;
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-button {
  padding: 15px;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 5px;
  color: #fff;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #333;
}
</style>