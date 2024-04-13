import React, { useState } from 'react';
import Axios from 'axios';

import './Login.css';

function Login(props) {

    const [userReg, setUserReg] = useState('')
    const email = props.email;
    const id = props.id;

    const [regStatus, setRegStatus] = useState('')

    const register = () => {
        console.log(email, id)

        if (!userReg) {
            setRegStatus('Please input a username or password.')
        } else {
            Axios.post('http://localhost:3256/register', {
                username : userReg,
                email: email,
                id: id,
            }).then((response) => {
                if (response.data.message) {
                    setRegStatus(response.data.message)
                } else {
                    setRegStatus('Successfully signed up!')
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page
                    }, 1000);
                }
            });
        }
    };

    return (
        <>
        <div className = "Login">
            <div className="Registration">
                <h1>set a display name :D</h1>
                <input type="text" placeholder="display name" 
                    onChange={event => setUserReg(event.target.value)}/>
                <button onClick={register}>let's go!</button>
            </div>

            <h2>{regStatus}</h2>
        </div>
        </>
    );
};

export default Login;