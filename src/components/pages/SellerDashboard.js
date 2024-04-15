import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Axios from 'axios';
import Header from '../Header';
import './SellerDashboard.css';
import ProductCard from '../ProductCard';
import ProductStatus from '../ProductStatus';


const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY);


function SellerDashBoard(props) {


  const products = [
    {
      id: 1,
      name: "University Physics Textbook",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff57c1f5853a5b6e4d96294f97432d2a7f5de286a43f024a8e481fc2076bed39?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
      thumbnailSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ece074034a620059676330e1952b29092d6f889fab13e5afee7524114e09a39d?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
      status: "Sold",
      price: 500,
    },
    {
      id: 2,
      name: "TI-Nspire Graphing Calculator",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f4cc14badd8850daa89cb3021f838ae4dacd6c03a650477f82d22a1a7e786fd?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
      status: "Selling",
      price: 300,
    },
  ];

  const [prods, setProds] = useState([]);
  const [session, setSession] = useState(null)
  const [selected, setSelected] = useState(''); // State to track the selected link

  const handleSelect = (name) => {
    setSelected(name); // Update the selected state based on link name
  };


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    Axios.get('http://localhost:3256/getall')
      .then(response => {
        setProds(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    return () => subscription.unsubscribe()
  }, [])

  console.log(session);

  const refreshProducts = () => {
    Axios.get('http://localhost:3256/getall')
      .then(response => {
        setProds(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleBuy = (productId) => {

    if (!session || !session.user) {
      console.error("No user logged in!");
      return;
    }

    console.log("BUYING", productId);

    Axios.post('http://localhost:3256/buy', {
      item: productId,
      buyer: session.user.id,
    })
      .then(response => {
        console.log("Product purchased successfully:", response.data);
        refreshProducts();
      })
      .catch(error => {
        console.error('Error purchasing product:', error);
      });
  };

  return (
    <div className="seller-dashboard">
      <Header />
      <h2 className="dashboard-title">Seller Dashboard</h2>
      <div className="dashboard-grid">
        <div className="sidebar">
          <Link
            to="/seller-dashboard"
            onClick={() => handleSelect('My Products')}
            className={selected === 'My Products' ? 'active' : ''}
          >
            My Products
          </Link>
          <Link
            to="/post"
            onClick={() => handleSelect('Add Product')}
            className={selected === 'Add Product' ? 'active' : ''}
          >
            Add Product
          </Link>
        </div>
        <div className="product-layout">
          <div className="product-column">
            <div className="product-row">
              <h3>Product Name</h3>
              <h3>Product Status</h3>
            </div>
            {products.map(product => (
              <div key={product.id} className="product-row">
                <ProductCard product={product} />
                <ProductStatus status={product.status} />
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="Product">
        <h2>all available products:</h2>
        <ul>
          {prods.map(item => (
            <li key={item.iid}>
              <strong>Product:</strong> {item.name}<br />
              <strong>Description:</strong> {item.description}<br />
              <strong>Category:</strong> {item.category}<br />
              <strong>Price:</strong> {item.price}<br />
              <strong>Seller:</strong> {item.seller}<br />
              {item.buyer ? (
                <><strong>Buyer:</strong> {item.buyer}<br /></>
              ) : (
                <button onClick={() => handleBuy(item.iid)}>Buy This</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SellerDashBoard;
