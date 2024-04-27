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
  
  const [prods, setProds] = useState([]);
  const [session, setSession] = useState(null)
  const [selected, setSelected] = useState(''); // State to track the selected link
  const [regStatus, setRegStatus] = useState('');

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

    Axios.post('http://localhost:3256/search', {category: "Housing",})
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
    Axios.post('http://localhost:3256/search', {category: "Housing",})
      .then(response => {
        if (response.data.message) {
            setRegStatus(response.data.message)
        } else {
            setProds(response.data.rows);
        }
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
      <h2 className="dashboard-title">Housing Products</h2>
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
            {prods.map((prod, index) => (
              <div key={index} className="product-row">
                <ProductCard prods={prod} handleBuy={handleBuy}/>
                <ProductStatus status={prod.buyer ? "Sold" : "Selling"} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div> //hii
  )
}

export default SellerDashBoard;
