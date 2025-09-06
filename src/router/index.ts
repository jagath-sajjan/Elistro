import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import LandingPage from '../components/LandingPage.vue'
import ProductPage from '../components/ProductPage.vue'
import AddProductPage from '../components/AddProductPage.vue'
import UserProfilePage from '../components/UserProfilePage.vue'
import ProductListingPage from '../components/ProductListingPage.vue'
import CartPage from '../components/CartPage.vue'
import PurchasesPage from '../components/PurchasesPage.vue'
import NotFoundPage from '../components/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/landing',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProductPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: AddProductPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/product-listing',
    name: 'ProductListing',
    component: ProductListingPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: PurchasesPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
