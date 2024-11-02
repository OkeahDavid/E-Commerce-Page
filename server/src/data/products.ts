// src/data/products.ts
/**
 * Represents a product in the system
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;
  /** Name of the product */
  name: string;
  /** Detailed description of the product */
  description: string;
  /** Price of the product in the default currency */
  price: number;
  /** Creation date of the product */
  createdAt: Date;
  /** Last update date of the product */
  updatedAt: Date;
}

/** In-memory storage for products */
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
  }
];

/**
 * Retrieves all products from the store
 * @returns Array of all products
 */
export const getProducts = (): Product[] => {
  return products;
};

/**
 * Retrieves a single product by its ID
 * @param id - The ID of the product to retrieve
 * @returns The found product or undefined if not found
 */
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Adds a new product to the store
 * @param product - The product data to add
 * @returns The newly created product
 */
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

/**
 * Updates an existing product
 * @param id - The ID of the product to update
 * @param updates - The fields to update
 * @returns The updated product or undefined if not found
 */
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