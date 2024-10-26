import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FloatingMenu from './components/FloatingMenu';
import Reseptit from './views/Reseptit';
import ReseptiView from './views/Resepti';
import FavoritesView from './views/Favorites';
import RandomRecipes from './views/RandomRecipes'; // Make sure this path is correct

function App() {
  const [recipes, setRecipes] = useState([]); // State for recipes
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/reseptit.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data); // Set the recipes state
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchRecipes(); // Fetch recipes on component mount
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Reseptit recipes={recipes} />} />
          <Route path="/resepti/:id" element={<ReseptiView recipes={recipes} />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route 
            path="/random-recipes" 
            element={<RandomRecipes recipes={recipes} />} // Pass the recipes prop
          />
        </Routes>

        {/* Floating Menu */}
        <FloatingMenu />
      </div>
    </Router>
  );
}

export default App;
