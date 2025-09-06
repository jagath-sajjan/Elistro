import express from 'express';
import { sql } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  try {
    const { category, condition, sort } = req.query;
    let query = sql`SELECT * FROM listings`;
    
    // Apply filters if provided
    const filters = [];
    const values = [];
    
    if (category) {
      filters.push(`category = $${values.length + 1}`);
      values.push(category);
    }
    
    if (condition) {
      filters.push(`condition = $${values.length + 1}`);
      values.push(condition);
    }
    
    if (filters.length > 0) {
      query = sql`
        SELECT * FROM listings
        WHERE ${sql.unsafe(filters.join(' AND '))}
      `;
    }
    
    // Apply sorting if provided
    if (sort === 'price_asc') {
      query = sql`${query} ORDER BY price ASC`;
    } else if (sort === 'price_desc') {
      query = sql`${query} ORDER BY price DESC`;
    } else if (sort === 'newest') {
      query = sql`${query} ORDER BY created_at DESC`;
    } else {
      // Default sort by newest
      query = sql`${query} ORDER BY created_at DESC`;
    }
    
    const listings = await query;
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const listings = await sql`
      SELECT l.*, u.display_name as seller_name
      FROM listings l
      JOIN users u ON l.seller_id = u.id
      WHERE l.id = ${id}
    `;
    
    if (listings.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    res.json(listings[0]);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new listing
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, price, imageUrl, category, condition } = req.body;
    const sellerId = req.user.id;
    
    // Validate input
    if (!title || !price || !category || !condition) {
      return res.status(400).json({ error: 'Required fields missing' });
    }
    
    const newListing = await sql`
      INSERT INTO listings (
        title, description, price, image_url, category, condition, seller_id
      ) VALUES (
        ${title}, ${description || ''}, ${price}, ${imageUrl || ''}, ${category}, ${condition}, ${sellerId}
      )
      RETURNING *
    `;
    
    res.status(201).json(newListing[0]);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a listing
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, imageUrl, category, condition } = req.body;
    const userId = req.user.id;
    
    // Check if listing exists and belongs to user
    const existingListing = await sql`
      SELECT * FROM listings WHERE id = ${id}
    `;
    
    if (existingListing.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    if (existingListing[0].seller_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this listing' });
    }
    
    // Update listing
    const updatedListing = await sql`
      UPDATE listings
      SET 
        title = ${title || existingListing[0].title},
        description = ${description !== undefined ? description : existingListing[0].description},
        price = ${price || existingListing[0].price},
        image_url = ${imageUrl !== undefined ? imageUrl : existingListing[0].image_url},
        category = ${category || existingListing[0].category},
        condition = ${condition || existingListing[0].condition},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    res.json(updatedListing[0]);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a listing
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Check if listing exists and belongs to user
    const existingListing = await sql`
      SELECT * FROM listings WHERE id = ${id}
    `;
    
    if (existingListing.length === 0) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    
    if (existingListing[0].seller_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this listing' });
    }
    
    // Delete listing
    await sql`DELETE FROM listings WHERE id = ${id}`;
    
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;