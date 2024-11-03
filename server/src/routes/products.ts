// src/routes/products.ts
import express, { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getProducts, getProductById } from '../data/products';
import { validateProductId } from '../middleware/validators';

const router: Router = express.Router();

// Define interface extending ParamsDictionary
interface ProductParams extends ParamsDictionary {
  id: string;
}

// Get all products endpoint
router.get('/', (_req: Request, res: Response): void => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    // Catch and respond to server errors
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single product by ID, with validation middleware
router.get(
  '/:id',
  validateProductId, // Ensure product ID is valid before processing
  (req: Request<ProductParams>, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = getProductById(id);

      // Return 404 if product is not found
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      // Respond with the found product
      res.json(product);
    } catch (error) {
      // Handle server-side errors
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);


export default router;