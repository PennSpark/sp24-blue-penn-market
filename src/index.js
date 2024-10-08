import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Home from './components/pages/Home';
import Post from './components/pages/Post';
import Login from './components/pages/Login';
import VideoTutorial from './components/pages/VideoTutorial'; 
import SellerDashboard from './components/pages/SellerDashboard'; 
import Education from './components/pages/Education';
import Electronics from './components/pages/Electronics';
import Furniture from './components/pages/Furniture';
import Housing from './components/pages/Housing';
import Lifestyle from './components/pages/Lifestyle';
import MyProducts from './components/pages/MyProducts';
import Results from './components/pages/Results';


import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/post",
    element: <Post/>,
  },
  {
    path: "/video-tutorial", 
    element: <VideoTutorial/>,
  },
  {
    path: "/seller-dashboard", 
    element: <SellerDashboard/>,
  },
  {
    path: "/login", 
    element: <Login/>,
  },
  {
    path:"/education",
    element: <Education/>,
  },
  {
    path:"/electronics",
    element: <Electronics/>,
  },
  {
    path:"/furniture",
    element: <Furniture/>,
  },
  {
    path:"/housing",
    element: <Housing/>,
  },
  {
    path:"/lifestyle",
    element: <Lifestyle/>,
  },
  {
    path:"/myproducts",
    element: <MyProducts/>,
  },
  {
    path:"/results",
    element: <Results search={window.location.search}/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();