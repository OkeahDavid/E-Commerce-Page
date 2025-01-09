import express, { Application } from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from Shoppers!' });
});

app.use('/api/products', productsRouter);

const port = process.env.PORT || 3000;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;