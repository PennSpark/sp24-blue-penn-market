import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';
import Navbar from '../NavBar';
import './Home.css';

function Home(props) {

    const [prods, setProds] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3256/getall') // Replace 'your-endpoint' with your actual endpoint
            .then(response => {
                setProds(response.data.rows); // Assuming response.data is an array of items
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Run once on component mount

    function getAllProd() {
        Axios.get('http://localhost:3256/getall')
        .then(function(response) {

            console.log('response successfully received, response below')
            console.log(response)
            setProds(response.data.rows);

        }).catch(function (error) {
            console.log('response unsusccessfully received, error below')
            console.log(error)
        }).finally(function (){
            console.log("This part is always executed no matter what")
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <h2>home page!</h2>
            <div className="Product">
                <h2>all available products:</h2>
                <ul>
                    {prods.map(item => (
                        <li>
                            <strong>Product:</strong> {item.name}<br />
                            <strong>Description:</strong> {item.description}<br />
                            <strong>Category:</strong> {item.category}<br />
                            <strong>Price:</strong> {item.price}<br />
                            <strong>Seller:</strong> {item.username}<br />
                        </li>
                    ))}
                </ul>
            </div>
        </>

    )
};

export default Home;