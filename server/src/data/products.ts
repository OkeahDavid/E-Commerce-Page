export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Product A",
      description: "Product A description",
      price: 20
    },
    {
      id: 2,
      name: "Product B",
      description: "Product B description",
      price: 30
    }
  ];
  
  export const getProducts = (): Product[] => {
    return products;
  };
  
  export const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };