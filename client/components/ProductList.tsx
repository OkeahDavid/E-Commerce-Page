import React, { useState, useEffect, useMemo } from "react";
import { Product } from "../../server/src/data/products";
import { ProductCard } from "./ProductCard";
import '../styles/product.css';

type SortDirection = 'asc' | 'desc' | 'none';

export const ProductList = () => {
   const [products, setProducts] = useState<Product[]>([]);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
   const [error, setError] = useState<string | null>(null);
   const [sortDirection, setSortDirection] = useState<SortDirection>('none');

   useEffect(() => {
       fetchProducts();
   }, []);

   const fetchProducts = async () => {
       try {
           const response = await fetch('/api/products');
           const data = await response.json();
           setProducts(data);
       } catch (err) {
           setError(err instanceof Error ? err.message : 'unknown error');
       }
   };

   const handleEdit = () => {
       if (selectedProduct) {
           setEditedProduct(selectedProduct);
           setIsEditing(true);
       }
   };

   const handleSave = async () => {
       if (!selectedProduct) return;

       try {
           const response = await fetch(`/api/products/${selectedProduct.id}`, {
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(editedProduct),
           });

           if (!response.ok) throw new Error('Failed to update product');

           const updatedProduct = await response.json();
           setSelectedProduct(updatedProduct);
           setProducts(products.map(p => 
               p.id === updatedProduct.id ? updatedProduct : p
           ));
           setIsEditing(false);
           setError(null);
       } catch (err) {
           setError(err instanceof Error ? err.message : 'Failed to update product');
       }
   };

   const handleCancel = () => {
       setIsEditing(false);
       setEditedProduct({});
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const { name, value } = e.target;
       setEditedProduct(prev => ({
           ...prev,
           [name]: name === 'price' ? Number(value) : value
       }));
   };

   const toggleSort = () => {
       setSortDirection(prev => {
           switch(prev) {
               case 'none': return 'asc';
               case 'asc': return 'desc';
               case 'desc': return 'none';
           }
       });
   };

   const sortedProducts = useMemo(() => {
       if (sortDirection === 'none') return products;
       
       return [...products].sort((a, b) => {
           if (sortDirection === 'asc') {
               return a.price - b.price;
           } else {
               return b.price - a.price;
           }
       });
   }, [products, sortDirection]);

   const uniqueProducts = useMemo(() => {
       const seen = new Set<string>();
       return sortedProducts.filter(product => {
           if (seen.has(product.name)) return false;
           seen.add(product.name);
           return true;
       });
   }, [sortedProducts]);

   return (
       <div className="product-list-container">
           <div className="sidebar">
               <div className="logo">
                   <h1>Shoppers</h1>
               </div>
               <button onClick={toggleSort} className="sort-button">
                   Sort by Price {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : ''}
               </button>
               <div className="product-grid">
                   {uniqueProducts.map(product => (
                       <ProductCard 
                           key={product.id} 
                           product={product}
                           onclick={setSelectedProduct}
                           isSelected={selectedProduct?.id === product.id} 
                       />
                   ))}
               </div>
           </div>

           {selectedProduct && (
               <div className="product-details">
                   {isEditing ? (
                       <>
                           <div className="product-header">
                               <input
                                   name="name"
                                   value={editedProduct.name || selectedProduct.name}
                                   onChange={handleInputChange}
                                   className="edit-input"
                               />
                               <input
                                   name="price"
                                   type="number"
                                   value={editedProduct.price || selectedProduct.price}
                                   onChange={handleInputChange}
                                   className="edit-input price-input"
                               />
                           </div>
                           <textarea
                               name="description"
                               value={editedProduct.description || selectedProduct.description}
                               onChange={handleInputChange}
                               className="edit-textarea"
                           />
                           <div className="button-group">
                               <button onClick={handleSave}>Save</button>
                               <button onClick={handleCancel}>Cancel</button>
                           </div>
                       </>
                   ) : (
                       <>
                           <div className="product-header">
                               <h2>{selectedProduct.name}</h2>
                               <span className="price">{selectedProduct.price} €</span>
                           </div>
                           <p className="description">{selectedProduct.description}</p>
                           <button onClick={handleEdit} className="edit-button">Edit</button>
                       </>
                   )}
                   {error && <div className="error-message">{error}</div>}
               </div>
           )}
       </div>
   );
};