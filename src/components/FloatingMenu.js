import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const FloatingMenu = () => {

    return (
        <div className="floating-menu">
            <div class="floatingMenuContent">
                <Link to="/" className="menu-link">Safkat</Link>
                <Link to="/random-recipes" className="menu-link">Hippo</Link>
                <Link to="/favorites" className="menu-link">Korissa</Link>
            </div>
        </div>
    );
};

export default FloatingMenu;
