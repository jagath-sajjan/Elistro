<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="neubrutalist-container p-4 max-w-4xl mx-auto text-center py-20">
    <h1 class="text-6xl font-bold mb-4 border-b-4 border-gray-900 pb-2 inline-block">404</h1>
    
    <div class="my-8">
      <h2 class="text-3xl font-bold mb-4">Page Not Found</h2>
      <p class="text-xl mb-8">The page you're looking for doesn't exist or has been moved.</p>
      
      <button @click="goHome" class="neubrutalist-button bg-blue-500 text-white text-xl px-8 py-4">
        Go Home
      </button>
    </div>
    
    <div class="mt-12">
      <svg class="mx-auto" width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="180" height="80" rx="4" stroke="black" stroke-width="4" />
        <line x1="10" y1="40" x2="190" y2="40" stroke="black" stroke-width="4" />
        <circle cx="25" cy="30" r="5" fill="#FF5F56" />
        <circle cx="45" cy="30" r="5" fill="#FFBD2E" />
        <circle cx="65" cy="30" r="5" fill="#27C93F" />
        <path d="M60 70L90 100M90 70L60 100" stroke="black" stroke-width="4" stroke-linecap="round" />
        <path d="M110 70L140 100M140 70L110 100" stroke="black" stroke-width="4" stroke-linecap="round" />
      </svg>
    </div>
  </div>
</template>