import React, { useState } from 'react';
import Navbar from '../NavBar'; 
import Header from '../Header';
import SearchBar from '../SearchBar';
import CategoryCard from '../CategoryCard';
import './Home.css';



function Home(props) {

    const [prods, setProds] = useState([]);

    // useEffect(() => {
    //     Axios.get('http://localhost:3256/getall') // Replace 'your-endpoint' with your actual endpoint
    //         .then(response => {
    //             setProds(response.data.rows); // Assuming response.data is an array of items
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []); // Run once on component mount

    // function getAllProd() {
    //     Axios.get('http://localhost:3256/getall')
    //     .then(function(response) {

    //         console.log('response successfully received, response below')
    //         console.log(response)
    //         setProds(response.data.rows);

    //     }).catch(function (error) {
    //         console.log('response unsusccessfully received, error below')
    //         console.log(error)
    //     }).finally(function (){
    //         console.log("This part is always executed no matter what")
    //     })
    // }

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

      return (
        <div className="home">
          <Navbar />
          <Header />
          <SearchBar />
          <div className="category-search">
            <h2 className="category-search-title">Category Search</h2>
            <div className="category-cards-container">
              {categories.map((category) => (
                <CategoryCard key={category.name} name={category.name} image={category.image} />
              ))}
            </div>
          </div>
        </div>
      );
    }

export default Home;
