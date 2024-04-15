import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageSrc}
          alt=""
          className="product-image"
        />
        {product.thumbnailSrc && (
          <img
            src={product.thumbnailSrc}
            alt={product.name}
            className="product-thumbnail"
          />
        )}
      </div>
      <div className="product-name">
        Name: {product.name}
      </div>
      <div className="product-price"> 
        Price: ${product.price}
      </div>
    </div>
  );
}

export default ProductCard;
