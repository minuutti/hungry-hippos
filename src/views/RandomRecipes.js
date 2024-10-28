// src/views/RandomRecipes.js
import React, { useState, useEffect } from 'react';
import RecipeItem from '../components/RecipeItem'; // Import the RecipeItem component

function RandomRecipes() {
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [itemsToPurchase, setItemsToPurchase] = useState([]);
    const [favoriteRecipeIds, setFavoriteRecipeIds] = useState([]);

    // Load saved random recipes and favorite IDs from local storage on component mount
    useEffect(() => {
        const savedRandomRecipes = JSON.parse(localStorage.getItem('randomRecipes')) || [];
        const savedFavoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        const savedItemsToPurchase = JSON.parse(localStorage.getItem('itemsToPurchase')) || [];

        setRandomRecipes(savedRandomRecipes);
        setFavoriteRecipeIds(savedFavoriteIds);
        setItemsToPurchase(savedItemsToPurchase);
    }, []);

    // Function to pick three random recipes
    const pickRandomRecipes = () => {
        const allRecipes = JSON.parse(localStorage.getItem('allRecipes')) || []; // Fetch all recipes from local storage

        const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
        const selectedRecipes = shuffled.slice(0, 3);

        setRandomRecipes(selectedRecipes);

        const items = selectedRecipes.flatMap(recipe =>
            recipe.Ostettava ? recipe.Ostettava.split(',').map(item => item.trim()) : []
        );
        setItemsToPurchase(items);

        // Save selected recipes and items to local storage
        localStorage.setItem('randomRecipes', JSON.stringify(selectedRecipes));
        localStorage.setItem('itemsToPurchase', JSON.stringify(items));
    };

    // Check if a recipe is a favorite based on its ID
    const isFavorite = (id) => {
        return favoriteRecipeIds.includes(id);
    };

    // Toggle the favorite status for a recipe
    const toggleFavorite = (recipeID) => {
        let updatedFavorites;
        if (isFavorite(recipeID)) {
            updatedFavorites = favoriteRecipeIds.filter(id => id !== recipeID);
        } else {
            updatedFavorites = [...favoriteRecipeIds, recipeID];
        }

        setFavoriteRecipeIds(updatedFavorites);
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    };

    return (
        <div id="ContentWrapper">
            <div id="RecipeListContainer">
                <div class="ListtHeader">
                    <div class="TitleAndAction">
                        <h2>Hippo lista</h2>
                        <button onClick={pickRandomRecipes} class="bigButton">Luo uusi lista</button>
                    </div>
                </div>
                {randomRecipes.length > 0 && (
                    <>
                        <ul>
                            {randomRecipes.map((recipe) => (
                                <RecipeItem
                                    key={recipe.ID}
                                    recipe={recipe}
                                    isFavorite={isFavorite}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </ul>

                        <h3>Näitä pittäis ostaa</h3>
                        <ul>
                            {itemsToPurchase.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default RandomRecipes;
