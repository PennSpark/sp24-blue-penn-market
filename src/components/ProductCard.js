import React from 'react';
import './ProductCard.css';
import handleBuy from './pages/SellerDashboard.js';




function ProductCard({ prods, handleBuy }) {

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
      <div className="product-email"> 
        Email: {prods.email}
      </div>
      <div className="product-description"> 
        Description: {prods.description}
      </div>
      <div className="product-bought"> 
      {prods.buyer ? (
                <><strong>Buyer:</strong> {prods.buyer}<br/></>
              ) : (
                <button onClick={() => handleBuy(prods.iid)}>Buy This</button>
              )}

      
      </div>
    </div>
  );
}

export default ProductCard;
