import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Axios from 'axios';

import Navbar from '../NavBar';
import Header from '../Header';
import SearchBar from '../SearchBar';
import CategoryCard from '../CategoryCard';
import './Home.css';
import slide2 from '../assets/penn market slide 2.PNG';
import slide3 from '../assets/penn market slide 3.PNG';
import slide4 from '../assets/penn market slide 4.PNG';


const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY);

function Home(props) {

    const [prods, setProds] = useState([]);
    const [session, setSession] = useState(null)

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
            refreshProducts();  // Refresh the list of products
        })
        .catch(error => {
            console.error('Error purchasing product:', error);
        });
    };

    const categories = [
        {
            name: "Education",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/304a9e00e713d370d5920c1724927c1d891943d42c54f6944bb1fc88a1db3c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        },
        {
            name: "Electronics",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb6243c2905e98f09bcb9aaf6f0c04725f9f36a2d3f85af5c3f4951dd5e12fe5?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        },
        {
            name: "Furniture",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a08a5727b2db808e70ebb1870b6fbf1da0923121dfc0a7126927c927c25c5ba1?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        },
        {
            name: "Housing",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b4b17bd5666e630bb1e41b1978cb63f686a352a2005455bc702e07c7427b3bab?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        },
        {
            name: "Lifestyle",
            image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c917e54a327eebad9e19642cc2ff8fb70cc71ada02b7aa930f31066e85332ce7?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        },
    ];

    const slides = [
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c0933f1ceba2634f89e237453c53a349f9d6385c7bfd120026d50f0c75f35d99?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
        slide2, slide3, slide4
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === categories.length - 2 ? prevIndex : prevIndex + 1));
    };
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };
    

    return (
        <div className="home">
            <Navbar />
            <Header />
            <SearchBar />
            <div className="image-slider">
                <div className="arrow left" onClick={prevSlide}></div>
                <img
                    loading="lazy"
                    src={slides[currentIndex]}
                    alt="Featured product"
                    className="slider-image"
                />
                <div className="arrow right" onClick={nextSlide}></div>
            </div>
            <div className="category-search">
                <h2 className="category-search-title">Category Search</h2>
                <div className="category-cards-container">
                    {categories.map((category) => (
                        <CategoryCard key={category.name} name={category.name} image={category.image} />
                    ))}
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
    );
}

export default Home;
