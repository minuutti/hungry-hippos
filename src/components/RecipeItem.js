// src/components/RecipeItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultFav from '../assets/defaultFav.svg';
import activeFav from '../assets/activeFav.svg';

const RecipeItem = ({ recipe, isFavorite, toggleFavorite }) => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/resepti/${id}`);
    };

    return (
        <li key={recipe.ID}>
            <div className="recipe-container">
                <div onClick={() => handleNavigate(recipe.ID)} class="recipeInfoContainer">
                    <div className="previewImageContainer">
                        <img src={recipe.Kuva} alt={recipe.Nimi} />
                    </div>
                    <div className="RecipeItemInfoContainer">
                        <h3>{recipe.Nimi}</h3>
                        <p>{recipe.Tyyppi}, {recipe.Tarkenne}</p>
                    </div>
                </div>
                <div className="favContainer">
                    <button className="favorite-btn" onClick={() => toggleFavorite(recipe.ID)}>
                        <img
                            src={isFavorite(recipe.ID) ? activeFav : defaultFav}
                            alt={isFavorite(recipe.ID) ? 'Remove from favorites' : 'Add to favorites'}
                        />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default RecipeItem;
