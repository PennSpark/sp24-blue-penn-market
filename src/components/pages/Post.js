import React, { useState } from 'react';
import Header from '../Header';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import './Post.css';

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
                category: category,
                price: price,
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
        <div className="post">
            <Header />
            <div className="postContainer">
                <h1>Post something!</h1>
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    placeholder="Name"
                    onChange={event => setName(event.target.value)} 
                />
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    placeholder="Description"
                    onChange={event => setDescription(event.target.value)} 
                />
                {/* Dropdown for Category */}
                <select
                    className="categoryDropdown"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    style={{ width: '100%', height: 56, margin: '8px 0', padding: '10px' }}
                >
                    <option value="">select category</option>
                    <option value="Education">education</option>
                    <option value="Electronics">electronics</option>
                    <option value="Furniture">furniture</option>
                    <option value="Housing">housing</option>
                    <option value="Lifestyle">lifestyle</option>
                </select>
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    placeholder="Price"
                    onChange={event => setPrice(event.target.value)} 
                />
                <button className="postButton" onClick={post}>Post</button>
                <h2>{postStatus}</h2>
            </div>
        </div>
    );
    
};

export default Post;