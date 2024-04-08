import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { TextField } from '@mui/material';
// import Axios from 'axios';
import Navbar from '../NavBar';
import './Home.css';
import { Link } from 'react-router-dom';

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
}


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
  
  function Header() {
    return (
      <header className="flex gap-5 w-full text-4xl font-bold tracking-wide text-sky-500 max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 text-center text-black">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c67f276ad36e4b3104072acf2d365d563328e79207fe3b1e8431fb68ed358980?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
            alt="Penn Market logo"
            className="shrink-0 aspect-[0.63] w-[39px]"
          />
          <h1 className="flex-auto my-auto">Penn Market</h1>
        </div>
        <nav className="flex gap-5">
          <a href="#" className="flex-auto my-auto">
            Seller Dashboard
          </a>
          <a href="#" className="flex-auto my-auto">
            Video Tutorial
          </a>
        </nav>
        <div className="flex gap-5 justify-between self-start mt-3 whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfd3a6192f755da2618d8dcccc7f7d3eedd62776a4d3e0747a2ce010a294540e?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
            alt="User avatar"
            className="shrink-0 aspect-square w-[51px]"
          />
          <Link to="/login" className="self-start mt-3">
          Login
        </Link>
        </div>
      </header>
    );
  }
  
  function SearchBar() {
    return (
      <form className="flex gap-2 px-3 py-2 mt-8 text-4xl font-bold tracking-wide text-blue-200 rounded-2xl border-2 border-black border-solid max-md:flex-wrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb74f37bfa2239c58cfec662e0de669ea14cb1141c36e6fd2e3e22c8fc5d49e?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
          alt="Search icon"
          className="shrink-0 aspect-square w-[49px]"
        />
        <label htmlFor="search" className="sr-only">
          Search a product
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search a product..."
          className="flex-auto self-start mt-3 max-md:max-w-full bg-transparent outline-none"
        />
      </form>
    );
  }
  
  function CategoryCard({ name, image }) {
    return (
      <div className="flex flex-col flex-1 items-center">
        <img
          loading="lazy"
          src={image}
          alt={`${name} category icon`}
          className="self-center rounded-full border-2 border-black border-solid aspect-square bg-[linear-gradient(217deg,#0788FF_8.24%,rgba(220,220,220,0.00)_91.14%)] h-[130px] stroke-[2px] w-[130px]"
        />
        <div className="mt-4 text-center">{name}</div>
      </div>
    );
  }
  
  function MyComponent() {
    return (
      <div className="flex flex-col px-11 pt-9 pb-20 bg-white max-md:px-5">
        <Header />
        <SearchBar />
        <div className="flex gap-5 justify-between items-center self-center mt-16 w-full max-w-[1177px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ece737dd9f1c5c8b6abc4932040731fa9f02ee8ece6d57382d686dda78f4a9ae?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
            alt="Left arrow"
            className="shrink-0 self-stretch my-auto aspect-[1.35] w-[42px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0933f1ceba2634f89e237453c53a349f9d6385c7bfd120026d50f0c75f35d99?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
            alt="Featured product"
            className="self-stretch w-full aspect-[1.79] max-md:max-w-full"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5645ad00fa114d904af47be2f32067036f3dff8ab277b32ac2272b97fb547b9c?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
            alt="Right arrow"
            className="shrink-0 self-stretch my-auto aspect-[1.35] w-[42px]"
          />
        </div>
        <h2 className="mt-20 text-4xl font-bold tracking-wide text-black max-md:mt-10 max-md:max-w-full">
          Category Search
        </h2>
        <div className="flex gap-5 items-start self-center mt-14 w-full text-2xl font-bold tracking-wide text-black whitespace-nowrap max-w-[1095px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    );
  }

export default MyComponent;

//     return (
//         <>
//             <Navbar></Navbar>
//             <h2>home page!</h2>
//             <div className="Product">
//                 <h2>all available products:</h2>
//                 <ul>
//                     {prods.map(item => (
//                         <li>
//                             <strong>Product:</strong> {item.name}<br />
//                             <strong>Description:</strong> {item.description}<br />
//                             <strong>Category:</strong> {item.category}<br />
//                             <strong>Price:</strong> {item.price}<br />
//                             <strong>Seller:</strong> {item.username}<br />
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </>

//     )
// };

// export default Home;