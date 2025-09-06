<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

const testClick = () => {
  message.value = 'Button clicked! Vue reactivity is working!'
}
</script>

<template>
  <div style="padding: 20px; background: #f0f0f0; min-height: 100vh;">
    <h1 style="color: red; font-size: 2rem;">Vue App is Working!</h1>
    <p style="color: blue;">If you can see this, Vue is mounting correctly.</p>
    <button @click="testClick" style="padding: 10px; background: green; color: white; border: none; border-radius: 5px;">
      Test Button
    </button>
    <p v-if="message" style="color: green; font-weight: bold;">{{ message }}</p>
  </div>
</template>

<style scoped>
/* Styles are handled in individual components */
</style>
