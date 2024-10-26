// src/views/ReseptiView.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import defaultFav from '../assets/defaultFav.svg'; // Adjust path based on your folder structure
import activeFav from '../assets/activeFav.svg';   // Adjust path based on your folder structure

function ReseptiView() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/reseptit.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Find the recipe with the matching ID
                const selectedRecipe = data.find((item) => item.ID === id);
                setRecipe(selectedRecipe);
                setIsLoading(false);

                // Check if the recipe is a favorite
                const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
                setIsFavorite(storedFavorites.includes(id));
            } catch (error) {
                console.error('Error fetching JSON data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Toggle the favorite status of the current recipe
    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        let updatedFavorites;

        if (isFavorite) {
            // If already a favorite, remove it
            updatedFavorites = storedFavorites.filter(favId => favId !== id);
        } else {
            // Otherwise, add it to favorites
            updatedFavorites = [...storedFavorites, id];
        }

        // Update Local Storage and state
        localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    const handleBackToList = () => {
        navigate('/'); // Navigate back to the main list
    };

    if (isLoading) {
        return <div>Loading...</div>; // Display loading indicator
    }

    if (!recipe) {
        return (
            <div>
                <p>No recipe found with ID number: {id}</p>
                <button onClick={handleBackToList}>Back to List</button>
            </div>
        );
    }

    return (
        <div id="ContentWrapper">
            <div id="RecipeContainer">
                <h1>{recipe.Nimi}</h1>
                <div className="recipeImageContainer">
                    <img src={recipe.Kuva} alt={recipe.Nimi} />
                </div>

                <button onClick={toggleFavorite} className="favorite-button">
                    <img 
                        src={isFavorite ? activeFav : defaultFav} 
                        alt={isFavorite ? "Remove from favorites" : "Add to favorites"} 
                        className="favorite-icon" 
                    />
                </button>

                <h2>Ainekset</h2>
                <ul>
                    {recipe.Ainekset.split(',').map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                    ))}
                </ul>
                <h2>Valmistus</h2>
                <ol>
                    {recipe.Valmistus.split(',').map((step, index) => (
                        <li key={index}>{step.trim()}</li>
                    ))}
                </ol>
                <h2>Osta ainakin</h2>
                <ol>
                    {recipe.Ostettava.split(',').map((toBuy, index) => (
                        <li key={index}>{toBuy.trim()}</li>
                    ))}
                </ol>
                <button onClick={handleBackToList}>Back to List</button>
            </div>
        </div>
    );
}

export default ReseptiView;
