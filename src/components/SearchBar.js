import React from 'react';
import './SearchBar.css'; 

function SearchBar() {
    return (
        <form className="search-bar">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb74f37bfa2239c58cfec662e0de669ea14cb1141c36e6fd2e3e22c8fc5d49e?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"
                alt="Search icon"
                className="search-icon"
            />
            <input
                type="search"
                id="search"
                placeholder="Search a product..."
                className="search-input"
            />
        </form>
    );
}

export default SearchBar;
