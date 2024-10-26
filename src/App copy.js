// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import the NavBar component
import Home from './views/Home'; // Import the Home view
import NewView from './views/NewView'; // Import the NewView component
import Reseptit from './views/Reseptit'; // Import the GoogleSheets component
import ReseptiView from './views/Resepti'; // Import the GoogleSheets component



function App() {
  return (
    <Router>
      <NavBar /> {/* Display the navigation bar */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for the Home view */}
          <Route path="/new-view" element={<NewView />} /> {/* Route for the NewView */}
          <Route path="/reseptit" element={<Reseptit />} /> {/* Route for the Google Sheets */}
          <Route path="/resepti/:id" component={ReseptiView} /> {/* Updated route path and component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reseptit from './views/Reseptit';
import ReseptiView from './views/Resepti';

function App() {
    return (
        <Router>
            <Routes> {/* Changed from <Switch> to <Routes> */}
                <Route path="/" element={<Reseptit />} />
                <Route path="/resepti/:id" element={<ReseptiView />} /> {/* Changed 'component' to 'element' */}
            </Routes>
        </Router>
    );
}

export default App;


/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './views/Home'; // Assuming you already have a Home view
import NewView from './views/NewView'; // Import the new view



import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hungry Hippos</h1>
        <p>
          Gotta eat something
        </p>

      </header>
    </div>
  );
  
}






export default App;
*/