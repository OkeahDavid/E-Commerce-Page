// src/routes/products.ts
import express, { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getProducts, getProductById } from '../data/products';
import { validateProductId } from '../middleware/validators';

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

export default router;