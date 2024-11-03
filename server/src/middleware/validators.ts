// src/middleware/validators.ts
import { Request, Response, NextFunction } from 'express';
import { Product } from '../data/products';

// Validates that product ID is a positive integer
export const validateProductId = (req: Request, res: Response, next: NextFunction): void => {
 const id = parseInt(req.params.id);
 if (isNaN(id) || id < 1) {
   res.status(400).json({ error: 'Invalid product ID. Must be a positive integer.' });
   return;
 }
 next();
};

// Validates required product fields and data types
export const validateProductData = (req: Request, res: Response, next: NextFunction): void => {
 const product = req.body as Partial<Product>;
 
 if (!product.name || typeof product.name !== 'string' || product.name.trim().length === 0) {
   res.status(400).json({ error: 'Product name is required and must be a non-empty string' });
   return;
 }

 if (!product.description || typeof product.description !== 'string') {
   res.status(400).json({ error: 'Product description is required and must be a string' });
   return;
 }

 if (typeof product.price !== 'number' || product.price < 0) {
   res.status(400).json({ error: 'Product price must be a non-negative number' });
   return;
 }

 next();
};