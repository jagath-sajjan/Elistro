import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testConnection } from './db/index.js';
import { createTables } from './db/schema.js';

// Import routes
import authRoutes from './routes/auth.js';
import listingsRoutes from './routes/listings.js';
import cartRoutes from './routes/cart.js';
import purchasesRoutes from './routes/purchases.js';

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchasesRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    res.json({
      status: 'ok',
      database: dbConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('Failed to connect to database. Server will not start.');
      process.exit(1);
    }
    
    // Create database tables if they don't exist
    await createTables();
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();