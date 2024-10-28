// src/views/Favorites.js
import React, { useEffect, useState } from 'react';
import RecipeItem from '../components/RecipeItem';


function Favorites() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);

    // Load favorite recipes from localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        fetch('/reseptit.json')
            .then(response => response.json())
            .then(data => {
                // Filter the recipes that are marked as favorites
                const favoriteData = data.filter(recipe => storedFavorites.includes(recipe.ID));
                setFavoriteRecipes(favoriteData);

                // Extract all "Ostettava" ingredients from favorite recipes
                const ingredientsList = favoriteData.flatMap(recipe => 
                    recipe.Ostettava ? recipe.Ostettava.split(',').map(item => item.trim()) : []
                );
                setAllIngredients(ingredientsList);
            })
            .catch(error => console.error('Error fetching JSON data:', error));
    }, []);

    return (
        <div id="ContentWrapper">
        <div id="FavoritesContainer">
            <h2>Your Favorite Recipes</h2>
            {favoriteRecipes.length === 0 ? (
                <p>No favorite recipes selected.</p>
            ) : (
                <ul>
                    {favoriteRecipes.map((recipe, index) => (
                        <li key={index}>
                            <a href={`/resepti/${recipe.ID}`}>
                                <div className="recipe-container">
                                    <h3>{recipe.Nimi}</h3>
                                    <p>{recipe.Tyyppi}, {recipe.Tarkenne}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <h2>Ingredients to Purchase</h2>
            {allIngredients.length === 0 ? (
                <p>No ingredients to purchase.</p>
            ) : (
                <ul>
                    {allIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
}

export default Favorites;
