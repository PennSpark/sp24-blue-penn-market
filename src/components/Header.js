import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './Header.css';
import './pages/Home.js';

const supabase = createClient(process.env.REACT_APP_MY_SUPABASE_URL, process.env.REACT_APP_MY_SUPABASE_KEY);

function Header() {

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
    
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    
        return () => subscription.unsubscribe()
      }, [])
    
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c67f276ad36e4b3104072acf2d365d563328e79207fe3b1e8431fb68ed358980?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
                    alt="Penn Market logo"
                    className="header-logo"
                />
                </Link>
                <Link to="/">
                <h1 className="header-title">Penn Market</h1>
                </Link>
            </div>
            <nav className="header-nav">
                <Link to="/seller-dashboard" className="header-link">Seller Dashboard</Link>
                <Link to="/video-tutorial" className="header-link">Video Tutorial</Link>
                <Link to="/post" className="header-link">Post</Link>
            </nav>
            <div className="header-user">
                <Link to="/">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfd3a6192f755da2618d8dcccc7f7d3eedd62776a4d3e0747a2ce010a294540e?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
                        alt="home icon"
                        className="user-avatar"
                    />
                </Link>
                <button className="sign-out-button" onClick={async () => {
                    await supabase.auth.signOut(); }}>
                SIGN OUT
                </button>

            </div>
        </header>
    );
}

export default Header;
