<template>
  <div class="add-product-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <h1 class="logo-text">Elistro</h1>
        </div>

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
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <h1 class="page-title">Add a new Product</h1>
      
      <form @submit.prevent="handleSubmit" class="product-form">
        <!-- Product Image Section -->
        <div class="form-section">
          <label class="section-label">Product Image</label>
          <div class="image-upload-area" @click="triggerFileUpload">
            <div class="upload-placeholder">
              <svg class="upload-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              <p class="upload-text">Add product Image</p>
              <p class="upload-hint">Click to upload or drag and drop</p>
            </div>
            <input 
              ref="fileInput"
              type="file" 
              @change="handleImageUpload"
              accept="image/*"
              multiple
              style="display: none;"
            />
          </div>
          <div v-if="uploadedImages.length > 0" class="uploaded-images">
            <div v-for="(image, index) in uploadedImages" :key="index" class="uploaded-image">
              <img :src="image.preview" :alt="`Uploaded image ${index + 1}`" />
              <button type="button" @click="removeImage(index)" class="remove-image">×</button>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="form-section">
          <div class="form-group">
            <label for="productTitle">Product Title</label>
            <input 
              type="text" 
              id="productTitle" 
              v-model="formData.productTitle"
              placeholder="Enter product title"
              required
            />
          </div>

          <div class="form-group">
            <label for="productCategory">Product Category</label>
            <select id="productCategory" v-model="formData.productCategory" required>
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-garden">Home & Garden</option>
              <option value="automotive">Automotive</option>
              <option value="books-media">Books & Media</option>
              <option value="sports">Sports</option>
              <option value="art-crafts">Art & Crafts</option>
              <option value="kitchen">Kitchen</option>
            </select>
          </div>

          <div class="form-group">
            <label for="productDescription">Product Description</label>
            <textarea 
              id="productDescription" 
              v-model="formData.productDescription"
              placeholder="Describe your product in detail"
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="price">Price ($)</label>
              <input 
                type="number" 
                id="price" 
                v-model="formData.price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input 
                type="number" 
                id="quantity" 
                v-model="formData.quantity"
                placeholder="1"
                min="1"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="condition">Condition</label>
            <select id="condition" v-model="formData.condition" required>
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div class="form-group">
            <label for="yearOfManufacture">Year of Manufacture (if applicable)</label>
            <input 
              type="number" 
              id="yearOfManufacture" 
              v-model="formData.yearOfManufacture"
              placeholder="e.g., 2020"
              min="1900"
              :max="new Date().getFullYear()"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="brand">Brand</label>
              <input 
                type="text" 
                id="brand" 
                v-model="formData.brand"
                placeholder="e.g., Apple, Nike"
              />
            </div>

            <div class="form-group">
              <label for="model">Model</label>
              <input 
                type="text" 
                id="model" 
                v-model="formData.model"
                placeholder="e.g., iPhone 13, Air Max"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="length">Length (cm)</label>
              <input 
                type="number" 
                id="length" 
                v-model="formData.dimensions.length"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div class="form-group">
              <label for="width">Width (cm)</label>
              <input 
                type="number" 
                id="width" 
                v-model="formData.dimensions.width"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div class="form-group">
              <label for="height">Height (cm)</label>
              <input 
                type="number" 
                id="height" 
                v-model="formData.dimensions.height"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="weight">Weight (kg)</label>
              <input 
                type="number" 
                id="weight" 
                v-model="formData.weight"
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div class="form-group">
              <label for="material">Material</label>
              <input 
                type="text" 
                id="material" 
                v-model="formData.material"
                placeholder="e.g., Plastic, Metal, Wood"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="color">Color</label>
            <input 
              type="text" 
              id="color" 
              v-model="formData.color"
              placeholder="e.g., Black, White, Red"
            />
          </div>

          <!-- Checkbox Fields -->
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.originalPackaging"
              />
              <span class="checkmark"></span>
              Original Packaging
            </label>

            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.manualIncluded"
              />
              <span class="checkmark"></span>
              Manual/Instructions Included
            </label>
          </div>

          <div class="form-group">
            <label for="workingCondition">Working Condition Description</label>
            <textarea 
              id="workingCondition" 
              v-model="formData.workingCondition"
              placeholder="Describe the current working condition and any issues"
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="submit-section">
          <button type="submit" class="add-item-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Add Item</span>
            <span v-else>Adding Item...</span>
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Component state
const cartCount = ref(1)
const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedImages = ref<Array<{file: File, preview: string}>>([])

// Form data
const formData = reactive({
  productTitle: '',
  productCategory: '',
  productDescription: '',
  price: '',
  quantity: 1,
  condition: '',
  yearOfManufacture: '',
  brand: '',
  model: '',
  dimensions: {
    length: '',
    width: '',
    height: ''
  },
  weight: '',
  material: '',
  color: '',
  originalPackaging: false,
  manualIncluded: false,
  workingCondition: ''
})

// Methods
const toggleCart = () => {
  console.log('Cart toggled')
}

const toggleProfile = () => {
  console.log('Profile toggled')
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedImages.value.push({
            file: file,
            preview: e.target?.result as string
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Validate required fields
    if (!formData.productTitle || !formData.productCategory || !formData.productDescription || !formData.price || !formData.condition) {
      throw new Error('Please fill in all required fields')
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Product submitted:', {
      ...formData,
      images: uploadedImages.value.map(img => img.file.name)
    })
    
    // Show success message
    alert('Product added successfully!')
    
    // Reset form
    Object.keys(formData).forEach(key => {
      if (key === 'dimensions') {
        formData.dimensions = { length: '', width: '', height: '' }
      } else if (typeof formData[key as keyof typeof formData] === 'boolean') {
        (formData as any)[key] = false
      } else if (key === 'quantity') {
        formData.quantity = 1
      } else {
        (formData as any)[key] = ''
      }
    })
    uploadedImages.value = []
    
  } catch (error) {
    console.error('Error submitting product:', error)
    alert('Error adding product. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.add-product-page {
  min-height: 100vh;
  background-color: #f8fafc;
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

/* Main Content */
.main-content {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 2rem 0;
  text-align: center;
}

.product-form {
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.section-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

/* Image Upload */
.image-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f9fafb;
}

.image-upload-area:hover {
  border-color: #ff6b9d;
  background-color: #fef7ff;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.upload-hint {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.uploaded-images {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.uploaded-image {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b9d;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-row .form-group:last-child {
  margin-bottom: 0;
}

/* Checkbox Group */
.checkbox-group {
  margin: 1.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background-color: #ff6b9d;
  border-color: #ff6b9d;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Submit Section */
.submit-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.add-item-btn {
  width: 100%;
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

.add-item-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.add-item-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (min-width: 768px) {
  .header-content,
  .main-content {
    max-width: 768px;
  }
  
  .form-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .header-content,
  .main-content {
    max-width: 1024px;
  }
}
</style>
