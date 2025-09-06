<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="neubrutalist-container p-8 max-w-md w-full">
      <h1 class="text-4xl font-bold mb-8 border-b-4 border-gray-900 pb-2">Login</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-lg font-bold mb-2">Email</label>
          <input 
            id="email" 
            v-model="formData.email" 
            type="email" 
            placeholder="your@email.com" 
            class="neubrutalist-input w-full"
            required
          >
        </div>
        
        <div>
          <label for="password" class="block text-lg font-bold mb-2">Password</label>
          <input 
            id="password" 
            v-model="formData.password" 
            type="password" 
            placeholder="••••••••" 
            class="neubrutalist-input w-full"
            required
          >
        </div>
        
        <div v-if="errorMessage" class="text-red-500 font-bold p-3 border-2 border-red-500 bg-red-50">
          {{ errorMessage }}
        </div>
        
        <div class="pt-4">
          <button 
            type="submit" 
            class="neubrutalist-button bg-blue-500 text-white w-full text-xl py-3"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-8 text-center">
          <p>Don't have an account?</p>
          <router-link to="/signup" class="font-bold underline">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Form data
const formData = reactive({
  email: '',
  password: ''
})

// Component state
const isLoading = ref(false)
const errorMessage = ref('')

// Login handler
const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Basic validation
    if (!formData.email || !formData.password) {
      throw new Error('Please fill in all fields')
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, accept any non-empty credentials
    if (formData.email && formData.password) {
      console.log('Login successful:', formData)
      // In a real app, you would:
      // 1. Hash the password
      // 2. Check against database
      // 3. Generate JWT token
      // 4. Redirect to dashboard
      alert('Login successful! (Demo)')
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.page-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.form-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.avatar-placeholder {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.7);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #ff6b9d;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.2);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.login-button {
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
}

.signup-link {
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.link {
  color: #ff6b9d;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}


/* Responsive Design */
@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }
  
  .form-card {
    padding: 2rem;
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .avatar-circle {
    width: 60px;
    height: 60px;
  }
  
  .avatar-icon {
    width: 30px;
    height: 30px;
  }
}
</style>
