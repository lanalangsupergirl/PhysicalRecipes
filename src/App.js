import React from 'react';
// import { hot } from 'react-hot-loader';
import './App.css';
import Header from './Header/Header.js';
import Container from '@mui/material/Container';
import SearchBar from './SearchBar/SearchBar.js';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.js';
import AllRecipes from './pages/allRecipes/AllRecipes.js';
import RecipeDetails from './pages/details/RecipeDetails';

function App() {
  return (
    <div className="App">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          height: 200,
          backgroundColor: '#7c808e',
          display: { md: 'flex' },
          pt: '88px',
        }}
      >
        <SearchBar />
      </Container>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/all" element={<AllRecipes />} />
        <Route path="/:title" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}

// export default hot(module)(App);
export default App;
