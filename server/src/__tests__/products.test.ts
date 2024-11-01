/// <reference types="jest" />

import request from 'supertest';
import app from '../server';

describe('Products API', () => {
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/api/products');
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('description');
      expect(res.body[0]).toHaveProperty('price');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a single product if valid id is provided', async () => {
      const res = await request(app).get('/api/products/1');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('description');
      expect(res.body).toHaveProperty('price');
    });

    it('should return 404 if product is not found', async () => {
      const res = await request(app).get('/api/products/999');
      
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Product not found');
    });

    it('should return 400 if invalid id is provided', async () => {
      const res = await request(app).get('/api/products/invalid');
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid product ID');
    });
  });
});