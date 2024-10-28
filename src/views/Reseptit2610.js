// src/views/Reseptit.js
import React, { useEffect, useState } from 'react';
import RecipeItem from '../components/RecipeItem'; // Adjust the path based on your folder structure


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
                <div id="ListHeader">
                    <h2>Hipoille safkaa</h2>
                </div>
                <ul>
                    {visibleRecipes.map((recipe, index) => (
                        <li key={index}>
                            <div className="recipe-container">
                                <a href={`/resepti/${recipe.ID}`}>
                                    <div className="previewImageContainer">
                                        <img src={recipe.Kuva} alt={recipe.Nimi} />
                                    </div>
                                    <div className="RecipeItemInfoContainer">
                                        <h3>{recipe.Nimi}</h3>
                                        <p>{recipe.Tyyppi}, {recipe.Tarkenne}</p>
                                    </div>
                                </a>
                                <div className="favContainer">
                                    <button className="favorite-btn" onClick={() => toggleFavorite(recipe.ID)}>
                                        <img
                                            src={isFavorite(recipe.ID) ? '/assets/activeFav.svg' : '/assets/defaultFav.svg'}
                                            alt={isFavorite(recipe.ID) ? 'Remove from favorites' : 'Add to favorites'}
                                        />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Reseptit;
