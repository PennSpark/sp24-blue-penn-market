import * as React from "react";
import Header from '../Header';
import './SellerDashboard.css';

const products = [
  {
    id: 1,
    name: "University Physics Textbook",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff57c1f5853a5b6e4d96294f97432d2a7f5de286a43f024a8e481fc2076bed39?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    thumbnailSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ece074034a620059676330e1952b29092d6f889fab13e5afee7524114e09a39d?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    status: "Sold",
  },
  {
    id: 2,
    name: "TI-Nspire Graphing Calculator",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f4cc14badd8850daa89cb3021f838ae4dacd6c03a650477f82d22a1a7e786fd?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    status: "Selling",
  },
];

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
    </div>
  );
}

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

function SellerDashboard() {
  return (
    <div className="seller-dashboard">
      <Header />
      <h2 className="dashboard-title">Seller Dashboard</h2>
      <div className="products-container">
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <div className="product-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <ProductCard product={product} />
              <ProductStatus status={product.status} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;
