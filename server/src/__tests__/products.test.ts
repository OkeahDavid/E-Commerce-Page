// src/tests/products.test.ts
import request from 'supertest';
import app from '../server';
import * as productModule from '../data/products';  // Change import to import whole module

describe('Products API', () => {
  // Helper function to reset products
  const resetProducts = () => {
    const products = [
      {
        id: 1,
        name: "Product A",
        description: "Product A description",
        price: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Product B",
        description: "Product B description",
        price: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Reset the products array
    jest.spyOn(productModule, 'getProducts').mockImplementation(() => products);
    jest.spyOn(productModule, 'getProductById').mockImplementation((id) => 
      products.find(p => p.id === id)
    );
  };

  beforeEach(() => {
    resetProducts();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
    });

    it('should handle empty product list', async () => {
      jest.spyOn(productModule, 'getProducts').mockImplementation(() => []);
      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should handle server errors gracefully', async () => {
      jest.spyOn(productModule, 'getProducts').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await request(app).get('/api/products');
      
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a single product if valid id is provided', async () => {
      const res = await request(app).get('/api/products/1');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: 1,
        name: 'Product A',
        description: 'Product A description',
        price: 20
      });
    });

    it('should return 404 if product is not found', async () => {
      jest.spyOn(productModule, 'getProductById').mockImplementation(() => undefined);
      const res = await request(app).get('/api/products/999');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Product not found' });
    });

    it('should return 400 if id is not a number', async () => {
      const res = await request(app).get('/api/products/invalid');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ 
        error: 'Invalid product ID. Must be a positive integer.' 
      });
    });

    it('should return 400 if id is negative', async () => {
      const res = await request(app).get('/api/products/-1');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ 
        error: 'Invalid product ID. Must be a positive integer.' 
      });
    });

    it('should handle server errors gracefully', async () => {
      jest.spyOn(productModule, 'getProductById').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await request(app).get('/api/products/1');
      
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal server error' });
    });
  });
});