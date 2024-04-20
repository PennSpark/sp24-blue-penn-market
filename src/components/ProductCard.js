import React from 'react';
import './ProductCard.css';

function ProductCard({ prods }) {
  return (
    <div className="product-card">
      
      <div className="product-name">
        {prods.name}
      </div>
      <div className="product-price"> 
        Price: ${prods.price}
      </div>
      <div className="product-category"> 
        Category: {prods.category}
      </div>
      <div className="product-seller"> 
        Seller: {prods.seller}
      </div>
      <div className="product-description"> 
        Description: {prods.description}
      </div>
    </div>
  );
}

export default ProductCard;
