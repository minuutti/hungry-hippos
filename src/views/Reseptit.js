// src/views/Reseptit.js
import React, { useEffect, useState } from 'react';
import RecipeItem from '../components/RecipeItem'; // Adjust the path based on your folder structure
import hippoIcon from '../assets/hippoIcon.svg';


function Reseptit() {
    const [recipes, setRecipes] = useState([]);
    const [visibleRecipes, setVisibleRecipes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    // Retrieve favorite recipes from local storage on initial load
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        setFavoriteRecipes(storedFavorites);
    }, []);

    // Fetch recipes data
    useEffect(() => {
        fetch('/reseptit.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRecipes(data);
                setVisibleRecipes(data);
            })
            .catch(error => {
                console.error('Error fetching JSON data:', error);
            });
    }, []);

    // Toggle favorite status for a recipe
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

    // Show two random recipes
    const handleRandomSelection = () => {
        const shuffled = [...recipes].sort(() => 0.5 - Math.random());
        setVisibleRecipes(shuffled.slice(0, 2)); // Display two random recipes
        setShowAll(false);
    };

    // Show all recipes
    const handleShowAll = () => {
        setVisibleRecipes(recipes);
        setShowAll(true);
    };

    const isFavorite = (id) => favoriteRecipes.includes(id);

    return (
        <div id="ContentWrapper">
            <div id="RecipeListContainer">
                <div class="ListtHeader">
                    <h2>Safkat</h2>
                </div>
                <ul>
                {visibleRecipes.map((recipe) => (
                        <RecipeItem
                            key={recipe.ID}
                            recipe={recipe}
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </ul>

            </div>

        </div>
    );
}

export default Reseptit;
