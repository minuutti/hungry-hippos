// src/components/FloatingMenu.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import homeIcon from '../assets/ListIcon.svg';
import homeActiveIcon from '../assets/ListIcon.svg'; // Active version
import hippoIcon from '../assets/hippoIcon.svg';
import hippoActiveIcon from '../assets/hippoIcon.svg'; // Active version
import basketIcon from '../assets/BasketIcon.svg';
import basketActiveIcon from '../assets/BasketIcon.svg'; // Active version

function FloatingMenu() {
  return (
    <div id="MenuContainer">
    <nav className="floating-menu">
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <img 
              src={window.location.pathname === '/' ? homeActiveIcon : homeIcon} 
              alt="Home" 
              className="menu-icon" 
            />
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/random-recipes" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <img 
              src={window.location.pathname === '/random-recipes' ? hippoActiveIcon : hippoIcon} 
              alt="Random Recipes" 
              className="menu-icon" 
            />
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            <img 
              src={window.location.pathname === '/favorites' ? basketActiveIcon : basketIcon} 
              alt="Favorites" 
              className="menu-icon" 
            />
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default FloatingMenu;
