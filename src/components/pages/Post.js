import React, { useState } from 'react';
import Header from '../Header';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';

import { createClient } from '@supabase/supabase-js';

import './Post.css';
import Navbar from '../NavBar.js';

const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY);

function Post(props) {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [sellId, setSellID] = useState('')
    const [postStatus, setPostStatus] = useState('')

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        if (session && session.user) {
            setSellID(session.user.id);  // Set seller ID here
        }
        })

        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        if (session && session.user) {
            setSellID(session.user.id);  // Set seller ID here
        }
        })

        return () => subscription.unsubscribe()
    }, [])

    console.log(session);


    const post = () => {

        if (!name | !description | !category | !price) {
            setPostStatus('Please input values for all fields.')
        } else {
            Axios.post('http://localhost:3256/post', {
                name: name,
                description: description,
                category : category,
                price : price,
                seller: sellId,
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
                    <button onClick={post}>post!</button>
                </div>

                <h2>{postStatus}</h2>
        </div>
        </>
    );
};

export default Post;