// src/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        // Retrieve favorite recipes from local storage
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        setFavoriteRecipes(storedFavorites);
    }, []);

    const toggleFavorite = (recipeID) => {
        let updatedFavorites;
        if (favoriteRecipes.includes(recipeID)) {
            updatedFavorites = favoriteRecipes.filter(id => id !== recipeID);
        } else {
            updatedFavorites = [...favoriteRecipes, recipeID];
        }

        setFavoriteRecipes(updatedFavorites);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    };

    return (
        <FavoritesContext.Provider value={{ favoriteRecipes, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
