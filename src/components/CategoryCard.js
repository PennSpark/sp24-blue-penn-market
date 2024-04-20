import React from 'react';
import './CategoryCard.css'; 
import { Link } from 'react-router-dom';

function CategoryCard({ name, image, path }) {
    return (
        <Link to={path} className="category-card" style={{ textDecoration: 'none' }}>
            <div className="category-card">
                <img
                    src={image}
                    alt={`${name} category icon`}
                    className="category-icon"
                />
                <div className="category-name">{name}</div>
            </div>
        </Link>
    );
}

export default CategoryCard;
