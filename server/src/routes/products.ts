import express, { Request, Response, Router } from 'express';
import { getProducts, getProductById } from '../data/products';

const router: Router = express.Router();

interface ProductParams {
  id: string;
}

// First route handler
router.get('/', (_req: Request, res: Response): void => {
  const products = getProducts();
  res.json(products);
});

// Second route handler
router.get('/:id', (req: Request<ProductParams>, res: Response): void => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  const product = getProductById(id);
  
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json(product);
});

export default router;