import React from 'react';
import './CategoryCard.css'; 

function CategoryCard({ name, image }) {
    return (
        <div className="category-card">
            <img
                src={image}
                alt={`${name} category icon`}
                className="category-icon"
            />
            <div className="category-name">{name}</div>
        </div>
    );
}

export default CategoryCard;
