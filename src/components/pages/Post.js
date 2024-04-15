import React, { useState } from 'react';
import Header from '../Header';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';

import './Post.css';
import Navbar from '../NavBar.js';

function Post(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [id, setID] = useState('')
    const [postStatus, setPostStatus] = useState('')

    const post = () => {

        if (!name | !description | !category | !price) {
            setPostStatus('Please input values for all fields.')
        } else {
            Axios.post('http://localhost:3256/post', {
                name: name,
                description: description,
                category : category,
                price : price,
                seller: id,
            }).then((response) => {
                if (response.data.message) {
                    setPostStatus(response.data.message)
                } else {
                    setPostStatus('Successfully posted!')
                }
            });
        }
    };

    return (
        <> 
            <Header />
            <Navbar></Navbar>
            <h2>post</h2>

            <div className = "Post">
                <div className="PostProduct">
                    <h1>post something!</h1>
                    <input type="text" placeholder="name" 
                        onChange={event => setName(event.target.value)}/>
                    <input type="text" placeholder="description"
                        onChange={event => setDescription(event.target.value)}/>
                    <input type="text" placeholder="category"
                        onChange={event => setCategory(event.target.value)}/>
                    <input type="text" placeholder="price"
                        onChange={event => setPrice(event.target.value)}/>
                    <input type="text" placeholder="seller (id for now)"
                        onChange={event => setID(event.target.value)}/>
                    <button onClick={post}>post!</button>
                </div>

                <h2>{postStatus}</h2>
        </div>
        </>
    );
};

export default Post;