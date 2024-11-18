import React, {useState, useEffect} from "react";
import { Product } from "../../server/src/data/products";
import { ProductCard } from "./ProductCard";
import '../styles/product.css';

export const ProductList = () =>{
    const  [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    //const [search]
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    
    const fetchProducts = async () => {
        try{
            const response = await fetch('/api/products');

            const data = await response.json();
            setProducts(data);
        }
        catch(err){
            setError(err instanceof Error ? err.message: 'unknown error');
        }
    };
    

    return (
        <div className="product-list-container">
            <div className="sidebar">
                <div className="logo">
                    <h1>Flink</h1>
                </div>
                <div className="product-grid">
                    {products.map(product => (
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
                    <div className="product-header">
                        <h2>{selectedProduct.name}</h2>
                        <span className="price">{selectedProduct.price} €</span>
                    </div>
                    <p className="description">{selectedProduct.description}</p>
                    <button className="save-button">Save</button>
                </div>
            )}
        </div>
    );
}
