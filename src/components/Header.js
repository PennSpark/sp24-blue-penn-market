import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c67f276ad36e4b3104072acf2d365d563328e79207fe3b1e8431fb68ed358980?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
                    alt="Penn Market logo"
                    className="header-logo"
                />
                <h1 className="header-title">Penn Market</h1>
            </div>
            <nav className="header-nav">
                <Link to="#" className="header-link">Seller Dashboard</Link>
                <Link to="#" className="header-link">Video Tutorial</Link>
            </nav>
            <div className="header-user">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfd3a6192f755da2618d8dcccc7f7d3eedd62776a4d3e0747a2ce010a294540e?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
                    alt="User avatar"
                    className="user-avatar"
                />
                <Link to="/login" className="user-login">Login</Link>
            </div>
        </header>
    );
}

export default Header;
