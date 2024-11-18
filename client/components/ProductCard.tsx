import React from 'react';
import { Product } from '../../server/src/data/products';


interface ProductCardProps {
    product: Product;
    onclick:(product:Product) => void;
    isSelected?: boolean;
}

export const ProductCard = ({ product, onclick, isSelected }: ProductCardProps) => (
    <div 
      className={`product-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onclick?.(product)}
    >
      <h3>{product.name}</h3>
    </div>
   );