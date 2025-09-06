# Elistro - Marketplace Application

## Overview
Elistro is a modern marketplace application built with Vue 3, Pinia, and Express.js. It features a neubrutalist design and connects to a Neon Postgres database for data storage and Neon Auth for authentication.

## Features
- User authentication (signup, login, profile management)
- Product listings with filtering and sorting
- Shopping cart functionality
- Purchase history
- Neubrutalist design system

## Tech Stack

### Frontend
- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Vue Router
- Tailwind CSS
- Axios for API requests

### Backend
- Express.js
- Neon Postgres (serverless PostgreSQL)
- Neon Auth for authentication
- JWT for session management
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Neon Postgres account
- Neon Auth project

### Environment Setup
Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL='your-neon-postgres-connection-string'

# Neon Auth
STACK_PROJECT_ID='your-neon-auth-project-id'
STACK_PUBLISHABLE_CLIENT_KEY='your-neon-auth-publishable-key'
STACK_SECRET_SERVER_KEY='your-neon-auth-secret-key'

# JWT
JWT_SECRET='your-jwt-secret'
JWT_EXPIRES_IN='24h'

# Server
PORT=3000
NODE_ENV=development
```

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   # Start frontend
   npm run dev
   
   # Start backend (in a separate terminal)
   npm run dev:server
   ```

3. Open your browser and navigate to `http://localhost:5173`
