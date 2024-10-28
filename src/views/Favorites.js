// src/views/Favorites.js
import React, { useEffect, useState } from 'react';
import RecipeItem from '../components/RecipeItem'; // Adjust the path based on your folder structure

function FavoritesView() {
    const [favoriteRecipeIds, setFavoriteRecipeIds] = useState([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [itemsToPurchase, setItemsToPurchase] = useState([]);

    // Load favorite recipe IDs from local storage and fetch corresponding recipes
    useEffect(() => {
        const storedFavoriteIds = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        setFavoriteRecipeIds(storedFavoriteIds);

        // Assuming all recipes are stored in local storage or fetched elsewhere in the app
        const storedRecipes = JSON.parse(localStorage.getItem('allRecipes')) || []; // Adjust based on your app

        // Filter recipes based on stored favorite IDs
        const favoriteRecipesData = storedRecipes.filter(recipe =>
            storedFavoriteIds.includes(recipe.ID)
        );

        setFavoriteRecipes(favoriteRecipesData);

        // Calculate items to purchase from favorite recipes
        const allItems = favoriteRecipesData.flatMap(recipe =>
            recipe.Ostettava ? recipe.Ostettava.split(',').map(item => item.trim()) : []
        );
        setItemsToPurchase(allItems);
    }, []);

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

        // Update the favorite recipes state by filtering stored recipes
        const storedRecipes = JSON.parse(localStorage.getItem('allRecipes')) || [];
        const updatedFavoriteRecipes = storedRecipes.filter(recipe =>
            updatedFavorites.includes(recipe.ID)
        );

        setFavoriteRecipes(updatedFavoriteRecipes);

        // Recalculate items to purchase from updated favorite recipes
        const updatedItems = updatedFavoriteRecipes.flatMap(recipe =>
            recipe.Ostettava ? recipe.Ostettava.split(',').map(item => item.trim()) : []
        );
        setItemsToPurchase(updatedItems);
    };

    return (
        <div id="ContentWrapper">
            <div id="RecipeListContainer">
                <div class="ListtHeader">
                    <h2>Näitä oltaisiin syömässä</h2>
                </div>
            {favoriteRecipes.length > 0 ? (
                <>
                    <ul>
                        {favoriteRecipes.map((recipe) => (
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
            ) : (
                <p>Ei mitään korissa, nälkä tulee :(</p>
            )}
        </div>
        </div>
    );
}

export default FavoritesView;
