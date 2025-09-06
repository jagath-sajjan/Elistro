import express from 'express';
import { sql } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's cart items
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const cartItems = await sql`
      SELECT c.id, c.quantity, l.id as listing_id, l.title, l.price, l.image_url, l.condition
      FROM cart_items c
      JOIN listings l ON c.listing_id = l.id
      WHERE c.user_id = ${userId}
    `;
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to cart
router.post('/', authenticate, async (req, res) => {
  try {
    const { listingId, quantity = 1 } = req.body;
    const userId = req.user.id;
    
    if (!listingId) {
      return res.status(400).json({ error: 'Listing ID is required' });
    }
    
    // Check if listing exists
    const listings = await sql`SELECT * FROM listings WHERE id = ${listingId}`;
    
    if (listings.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    // Check if item is already in cart
    const existingCartItems = await sql`
      SELECT * FROM cart_items 
      WHERE user_id = ${userId} AND listing_id = ${listingId}
    `;
    
    if (existingCartItems.length > 0) {
      // Update quantity if already in cart
      const updatedCartItem = await sql`
        UPDATE cart_items
        SET quantity = ${quantity}, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId} AND listing_id = ${listingId}
        RETURNING *
      `;
      
      return res.json(updatedCartItem[0]);
    }
    
    // Add new item to cart
    const newCartItem = await sql`
      INSERT INTO cart_items (user_id, listing_id, quantity)
      VALUES (${userId}, ${listingId}, ${quantity})
      RETURNING *
    `;
    
    res.status(201).json(newCartItem[0]);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update cart item quantity
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }
    
    // Check if cart item exists and belongs to user
    const existingCartItems = await sql`
      SELECT * FROM cart_items WHERE id = ${id} AND user_id = ${userId}
    `;
    
    if (existingCartItems.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Update quantity
    const updatedCartItem = await sql`
      UPDATE cart_items
      SET quantity = ${quantity}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    res.json(updatedCartItem[0]);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Check if cart item exists and belongs to user
    const existingCartItems = await sql`
      SELECT * FROM cart_items WHERE id = ${id} AND user_id = ${userId}
    `;
    
    if (existingCartItems.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Delete cart item
    await sql`DELETE FROM cart_items WHERE id = ${id}`;
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear entire cart
router.delete('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;