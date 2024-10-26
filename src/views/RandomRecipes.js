import React, { useState, useEffect } from 'react';

function RandomRecipes({ recipes = [] }) { // Default to an empty array if recipes is undefined
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [itemsToPurchase, setItemsToPurchase] = useState([]);

  useEffect(() => {
    // Load saved random recipes and items to purchase from local storage on component mount
    const savedRandomRecipes = localStorage.getItem('randomRecipes');
    const savedItemsToPurchase = localStorage.getItem('itemsToPurchase');

    if (savedRandomRecipes) {
      setRandomRecipes(JSON.parse(savedRandomRecipes));
    }

    if (savedItemsToPurchase) {
      setItemsToPurchase(JSON.parse(savedItemsToPurchase));
    }
  }, []);

  const pickRandomRecipes = () => {
    if (!Array.isArray(recipes) || recipes.length === 0) {
      console.error("Recipes prop is not an array or is empty");
      return; // Exit if recipes is not an array or is empty
    }

    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
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

  return (
    <div id="ContentWrapper">
      <div id="RecipeListContainer">
        <h2>Random Recipes</h2>
        <button onClick={pickRandomRecipes}>Pick Three Random Recipes</button>
        <a href="../">Back to List</a>

        {randomRecipes.length > 0 && (
          <>
            <h3>Selected Recipes</h3>
            <ul>
              {randomRecipes.map((recipe, index) => (
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
                  </div>
                </li>
              ))}
            </ul>

            <h3>Items to Purchase</h3>
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
