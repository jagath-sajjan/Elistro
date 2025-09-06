import { Listing } from '../stores/listings'
import { Purchase } from '../stores/purchases'

// Mock user data
const mockUsers = [
  {
    id: 'user1',
    email: 'user@example.com',
    username: 'demouser',
    password: 'password123' // In a real app, passwords would be hashed
  }
]

// Mock listings data
const mockListings: Listing[] = [
  {
    id: 'listing1',
    title: 'Vintage Mechanical Keyboard',
    description: 'A beautiful mechanical keyboard with cherry MX switches. Lightly used.',
    price: 85,
    category: 'Electronics',
    imageUrl: 'https://placehold.co/600x400?text=Keyboard',
    sellerId: 'user1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'listing2',
    title: 'Eco-friendly Water Bottle',
    description: 'Reusable water bottle made from recycled materials. 750ml capacity.',
    price: 25,
    category: 'Home',
    imageUrl: 'https://placehold.co/600x400?text=Water+Bottle',
    sellerId: 'user1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'listing3',
    title: 'Vintage Denim Jacket',
    description: 'Classic denim jacket from the 90s. Size M. Great condition.',
    price: 45,
    category: 'Clothing',
    imageUrl: 'https://placehold.co/600x400?text=Denim+Jacket',
    sellerId: 'user1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'listing4',
    title: 'Programming Books Bundle',
    description: 'Collection of 5 programming books covering JavaScript, TypeScript, and Vue.',
    price: 60,
    category: 'Books',
    imageUrl: 'https://placehold.co/600x400?text=Programming+Books',
    sellerId: 'user1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'listing5',
    title: 'Yoga Mat',
    description: 'Eco-friendly yoga mat, 5mm thickness. Perfect for home workouts.',
    price: 30,
    category: 'Sports',
    imageUrl: 'https://placehold.co/600x400?text=Yoga+Mat',
    sellerId: 'user1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'listing6',
    title: 'Handmade Ceramic Mug',
    description: 'Beautiful handcrafted ceramic mug. Microwave and dishwasher safe.',
    price: 18,
    category: 'Home',
    imageUrl: 'https://placehold.co/600x400?text=Ceramic+Mug',
    sellerId: 'user1',
    createdAt: new Date().toISOString()
  }
]

// Mock cart data
const mockCart = new Map()

// Mock purchases data
const mockPurchases = new Map<string, Purchase[]>()

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 15)

// Mock API service
export const mockApi = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      await simulateNetworkDelay()
      
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (!user) {
        throw new Error('Invalid credentials')
      }
      
      const token = `mock-jwt-token-${user.id}-${Date.now()}`
      
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username
        }
      }
    },
    
    register: async (email: string, password: string, username: string) => {
      await simulateNetworkDelay()
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists')
      }
      
      const newUser = {
        id: generateId(),
        email,
        password,
        username
      }
      
      mockUsers.push(newUser)
      
      const token = `mock-jwt-token-${newUser.id}-${Date.now()}`
      
      return {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username
        }
      }
    },
    
    getProfile: async (token: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const user = mockUsers.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('User not found')
      }
      
      return {
        id: user.id,
        email: user.email,
        username: user.username
      }
    },
    
    updateProfile: async (token: string, userData: { username?: string }) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const user = mockUsers.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('User not found')
      }
      
      if (userData.username) {
        user.username = userData.username
      }
      
      return {
        id: user.id,
        email: user.email,
        username: user.username
      }
    }
  },
  
  // Listings endpoints
  listings: {
    getAll: async () => {
      await simulateNetworkDelay()
      return [...mockListings]
    },
    
    getById: async (id: string) => {
      await simulateNetworkDelay()
      
      const listing = mockListings.find(l => l.id === id)
      
      if (!listing) {
        throw new Error('Listing not found')
      }
      
      return listing
    },
    
    create: async (token: string, listingData: Omit<Listing, 'id' | 'sellerId' | 'createdAt'>) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      
      const newListing: Listing = {
        id: generateId(),
        ...listingData,
        sellerId: userId,
        createdAt: new Date().toISOString()
      }
      
      mockListings.push(newListing)
      
      return newListing
    },
    
    update: async (token: string, id: string, listingData: Partial<Listing>) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const listingIndex = mockListings.findIndex(l => l.id === id)
      
      if (listingIndex === -1) {
        throw new Error('Listing not found')
      }
      
      const listing = mockListings[listingIndex]
      
      if (listing.sellerId !== userId) {
        throw new Error('Unauthorized')
      }
      
      const updatedListing = {
        ...listing,
        ...listingData
      }
      
      mockListings[listingIndex] = updatedListing
      
      return updatedListing
    },
    
    delete: async (token: string, id: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const listingIndex = mockListings.findIndex(l => l.id === id)
      
      if (listingIndex === -1) {
        throw new Error('Listing not found')
      }
      
      const listing = mockListings[listingIndex]
      
      if (listing.sellerId !== userId) {
        throw new Error('Unauthorized')
      }
      
      mockListings.splice(listingIndex, 1)
      
      return { success: true }
    }
  },
  
  // Cart endpoints
  cart: {
    getCart: async (token: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userCart = mockCart.get(userId) || []
      
      return userCart
    },
    
    addItem: async (token: string, listingId: string, quantity: number) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const listing = mockListings.find(l => l.id === listingId)
      
      if (!listing) {
        throw new Error('Listing not found')
      }
      
      let userCart = mockCart.get(userId)
      
      if (!userCart) {
        userCart = []
        mockCart.set(userId, userCart)
      }
      
      // Check if item already exists in cart
      const existingItemIndex = userCart.findIndex(item => item.listing.id === listingId)
      
      if (existingItemIndex !== -1) {
        userCart[existingItemIndex].quantity += quantity
      } else {
        userCart.push({
          id: generateId(),
          listing,
          quantity
        })
      }
      
      return { success: true, cartItem: userCart.find(item => item.listing.id === listingId) }
    },
    
    updateItem: async (token: string, itemId: string, quantity: number) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userCart = mockCart.get(userId)
      
      if (!userCart) {
        throw new Error('Cart not found')
      }
      
      const itemIndex = userCart.findIndex(item => item.id === itemId)
      
      if (itemIndex === -1) {
        throw new Error('Item not found in cart')
      }
      
      userCart[itemIndex].quantity = quantity
      
      return { success: true }
    },
    
    removeItem: async (token: string, itemId: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userCart = mockCart.get(userId)
      
      if (!userCart) {
        throw new Error('Cart not found')
      }
      
      const itemIndex = userCart.findIndex(item => item.id === itemId)
      
      if (itemIndex === -1) {
        throw new Error('Item not found in cart')
      }
      
      userCart.splice(itemIndex, 1)
      
      return { success: true }
    },
    
    clearCart: async (token: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      mockCart.set(userId, [])
      
      return { success: true }
    }
  },
  
  // Purchase endpoints
  purchases: {
    createPurchase: async (token: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userCart = mockCart.get(userId)
      
      if (!userCart || userCart.length === 0) {
        throw new Error('Cart is empty')
      }
      
      // Create a new purchase from cart items
      const purchase: Purchase = {
        id: generateId(),
        items: userCart.map(item => ({
          id: generateId(),
          listing: item.listing,
          quantity: item.quantity,
          price: item.listing.price
        })),
        totalAmount: userCart.reduce((total, item) => total + (item.listing.price * item.quantity), 0),
        purchaseDate: new Date().toISOString(),
        status: 'completed'
      }
      
      // Add purchase to user's purchase history
      let userPurchases = mockPurchases.get(userId)
      
      if (!userPurchases) {
        userPurchases = []
        mockPurchases.set(userId, userPurchases)
      }
      
      userPurchases.push(purchase)
      
      // Clear the user's cart
      mockCart.set(userId, [])
      
      return purchase
    },
    
    getPurchases: async (token: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userPurchases = mockPurchases.get(userId) || []
      
      return userPurchases
    },
    
    getPurchaseById: async (token: string, purchaseId: string) => {
      await simulateNetworkDelay()
      
      const userId = extractUserIdFromToken(token)
      const userPurchases = mockPurchases.get(userId) || []
      
      const purchase = userPurchases.find(p => p.id === purchaseId)
      
      if (!purchase) {
        throw new Error('Purchase not found')
      }
      
      return purchase
    }
  }
}

// Helper functions
function extractUserIdFromToken(token: string): string {
  // In a real app, this would decode the JWT token
  // For our mock, we'll just extract the user ID from the token string
  const match = token.match(/mock-jwt-token-(.*?)-/)
  return match ? match[1] : ''
}

async function simulateNetworkDelay() {
  // Simulate network latency between 100-500ms
  const delay = Math.floor(Math.random() * 400) + 100
  return new Promise(resolve => setTimeout(resolve, delay))
}