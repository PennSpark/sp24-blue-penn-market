import React from 'react';
import './ProductStatus.css';

function ProductStatus({ status }) {
  const backgroundColor = status === "Selling" ? "#4CAF50" : (status === "Sold" ? "rgb(255, 83, 83)" : "defaultColor")
  return (
    <div className="product-status" style={{ backgroundColor: backgroundColor }}>
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

/*import React from 'react';
import './ProductStatus.css';


function ProductStatus({ status }) {
  const statusClass = status === "Selling" ? "product-status-selling" : (status === "Sold" ? "product-status-sold" : "product-status");
  return (
    <div className={statusClass}>
      <div className="status-text">{status}</div>
      <img
        src={status === "Sold" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"}
        alt=""
        className="status-icon"
      />
    </div>
  );
}

export default ProductStatus;*/