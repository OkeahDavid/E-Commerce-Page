// src/data/products.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Initial product data
export const products: Product[] = [
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
  },
  {
    id: 3,
    name: "Product C",
    description: "Product C description",
    price: 40,
    createdAt: new Date(), 
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Product D",
    description: "Product D description",
    price: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  }
 ];

// Get all products
export const getProducts = (): Product[] => {
  return products;
};

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Create new product
export const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
  const newProduct: Product = {
    ...product,
    id: Math.max(...products.map(p => p.id)) + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  products.push(newProduct);
  return newProduct;
};

// Update existing product
export const updateProduct = (id: number, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | undefined => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return undefined;

  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date()
  };

  return products[index];
};