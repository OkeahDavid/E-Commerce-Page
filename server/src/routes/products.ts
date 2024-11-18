// src/routes/products.ts
import express, { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getProducts, getProductById, Product, updateProduct } from '../data/products';
import { validateProductId } from '../middleware/validators';
import { error } from 'console';

const router: Router = express.Router();

// Type for request parameters containing product ID
interface ProductParams extends ParamsDictionary {
  id: string;
}

// GET /api/products
router.get('/', (_req: Request, res: Response): void => {
  try {
    const products = getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id
router.get(
  '/:id',
  validateProductId,
  (req: Request<ProductParams>, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = getProductById(id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);
router.put(
  '/:id',
  validateProductId,
  (req: Request<ProductParams>, res: Response): void => {
    try {
      const id = parseInt(req.params.id);
      const { name, description, price } = req.body;

      const updates: Partial<Product> = {};
      
      if (name !== undefined) updates.name = name;
      if (description !== undefined) updates.description = description;
      if (price !== undefined) updates.price = price;

      const updatedProduct = updateProduct(id, updates);
      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;