import React from 'react';
import './ProductStatus.css';

function ProductStatus({ status }) {
  return (
    <div className="product-status">
      <div className="status-text">{status}</div>
      <img
        src={status === "Sold" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"}
        alt=""
        className="status-icon"
      />
    </div>
  );
}

export default ProductStatus;
