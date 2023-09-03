import React from 'react';
import './App.css';
import { useEffect } from 'react';
import Header from './Header/Header.js';
import Container from '@mui/material/Container';
import SearchBar from './SearchBar/SearchBar.js';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.js';
import AllData from './pages/allData/AllData.js';
import RecipeDetails from './pages/details/RecipeDetails';
import CategoriesSort from './pages/sorting/CategoriesSort';
import IngredientsSort from './pages/sorting/IngredientsSort';
import AddRecipe from './AddRecipe/AddRecipe';
import EditRoute from './pages/EditRoute/EditRoute';
import Favorites from './Favorites/Favorites';
import Authentication from './Authentication/Authentication';
import { fetchRecipes } from './store/dataRecipesSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.dataRecipes);
  const recipeId = useSelector((state) => state.fullRecipe.recipeId);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  const hideBar = useSelector((state) => state.search.hideBar);

  return (
    <div className="App">
      <Header />
      {hideBar ? (
        <Container
          sx={{
            display: 'none',
          }}
        />
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            height: 200,
            backgroundColor: '#7c808e',
            display: { md: 'flex' },
            pt: '88px',
            justifyContent: 'center',
          }}
        >
          <SearchBar />
        </Container>
      )}
      {status === 'loading' && <h1>Loading...</h1>}
      {error && <h2>Error {error}</h2>}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/all" element={<AllData />} />
        <Route path="/id=:id" element={<RecipeDetails />} />
        <Route path="/categories/:category" element={<CategoriesSort />} />
        <Route path="/ingredients/:ingredient" element={<IngredientsSort />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe:id" element={<EditRoute />} />
        <Route path="/settings/:setting" element={<Favorites />}/>
        <Route path="/signup" element={<Authentication />}/>
      </Routes>
    </div>
  );
}

// export default hot(module)(App);
export default App;
