import express from 'express';
import { sql } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's purchase history
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const purchases = await sql`
      SELECT p.id, p.total_amount, p.status, p.created_at
      FROM purchases p
      WHERE p.user_id = ${userId}
      ORDER BY p.created_at DESC
    `;
    
    // Get items for each purchase
    for (const purchase of purchases) {
      purchase.items = await sql`
        SELECT pi.id, pi.title, pi.price, pi.quantity
        FROM purchase_items pi
        WHERE pi.purchase_id = ${purchase.id}
      `;
    }
    
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific purchase by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const purchases = await sql`
      SELECT p.id, p.total_amount, p.status, p.created_at
      FROM purchases p
      WHERE p.id = ${id} AND p.user_id = ${userId}
    `;
    
    if (purchases.length === 0) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    
    const purchase = purchases[0];
    
    // Get items for the purchase
    purchase.items = await sql`
      SELECT pi.id, pi.title, pi.price, pi.quantity
      FROM purchase_items pi
      WHERE pi.purchase_id = ${purchase.id}
    `;
    
    res.json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new purchase (checkout)
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's cart items
    const cartItems = await sql`
      SELECT c.id, c.quantity, l.id as listing_id, l.title, l.price
      FROM cart_items c
      JOIN listings l ON c.listing_id = l.id
      WHERE c.user_id = ${userId}
    `;
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    
    // Start transaction
    await sql`BEGIN`;
    
    try {
      // Create purchase record
      const newPurchase = await sql`
        INSERT INTO purchases (user_id, total_amount, status)
        VALUES (${userId}, ${totalAmount}, 'completed')
        RETURNING *
      `;
      
      const purchaseId = newPurchase[0].id;
      
      // Create purchase items
      for (const item of cartItems) {
        await sql`
          INSERT INTO purchase_items (purchase_id, listing_id, title, price, quantity)
          VALUES (
            ${purchaseId},
            ${item.listing_id},
            ${item.title},
            ${item.price},
            ${item.quantity}
          )
        `;
      }
      
      // Clear user's cart
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
      
      // Commit transaction
      await sql`COMMIT`;
      
      // Get complete purchase with items
      const purchase = newPurchase[0];
      purchase.items = await sql`
        SELECT pi.id, pi.title, pi.price, pi.quantity
        FROM purchase_items pi
        WHERE pi.purchase_id = ${purchase.id}
      `;
      
      res.status(201).json(purchase);
    } catch (error) {
      // Rollback transaction on error
      await sql`ROLLBACK`;
      throw error;
    }
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;