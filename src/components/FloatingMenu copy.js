import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const FloatingMenu = () => {

    return (
        <div className="floating-menu">
            <Link to="/" className="menu-link">Home</Link>
            <Link to="/random-recipes" className="menu-link">Random Recipes</Link>
            <Link to="/favorites" className="menu-link">
                Favorites
            </Link>
        </div>
    );
};

export default FloatingMenu;
