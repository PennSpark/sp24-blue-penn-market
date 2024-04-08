import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Axios from 'axios';
import { createBrowserRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import './NavBar.css';


function NavBar(props) {
    return (
        <div className = "NavBar">
            <div className ="navbar-logo">
                <h1>penn market</h1>
            </div>
            <div className='navbar-menu'>
                <li><a href="/">home</a></li>
                <li><a href="/post">post</a></li>
            </div>
        </div>
    );
};

export default NavBar;