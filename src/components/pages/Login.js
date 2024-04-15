import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';
import Header from '../Header';

import './Login.css';
import NavBar from '../NavBar.js';


function Login(props) {

    const [userReg, setUserReg] = useState('')
    const [passReg, setPassReg] = useState('')
    const [emailReg, setEmailReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [regStatus, setRegStatus] = useState('')
    const [loginStatus, setLoginStatus] = useState('')

    const register = () => {

        if (!userReg | !passReg) {
            setRegStatus('Please input a username or password.')
        } else {
            Axios.post('http://localhost:3256/register', {
                username : userReg,
                password: passReg,
                email: emailReg, 
            }).then((response) => {
                if (response.data.message) {
                    setRegStatus(response.data.message)
                } else {
                    setRegStatus('Successfully signed up!')
                }
            });
        }
    };

    const login = () => {
        Axios.post('http://localhost:3256/login', {
            username : username,
            password: password, 
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data.rows[0].username + ' is logged in.')
            }
        });
    };

    return (
        <>
        <Header />
        <NavBar></NavBar>
        <h2>login</h2>

        <div className = "Login">
            
            <div className="Registration">
                <h1>New User</h1>
                <input type="text" placeholder="username" 
                    onChange={event => setUserReg(event.target.value)}/>
                <input type="password" placeholder="password"
                    onChange={event => setPassReg(event.target.value)}/>
                <input type="email" placeholder="penn email"
                    onChange={event => setEmailReg(event.target.value)}/>
                <button onClick={register}>register!</button>
            </div>

            <h2>{regStatus}</h2>

            <div className="Login">
                <h1>Returning User</h1>
                <input type="text" placeholder="username" 
                    onChange={event => setUsername(event.target.value)}/>
                <input type="password" placeholder="password" 
                    onChange={event => setPassword(event.target.value)}/>
                <button onClick={login}>sign in!</button>
            </div>

            <h2>{loginStatus}</h2>
        </div>
        </>
    );
};

export default Login;