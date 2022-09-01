import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import fullRecipeSlice from './fullRecipeSlice';
import setFavoriteSlice from './setFavoriteSlice';
import dataRecipesSlice from './dataRecipesSlice';

export default configureStore({
  reducer: {
    search: searchSlice,
    fullRecipe: fullRecipeSlice,
    favoriteRecipes: setFavoriteSlice,
    dataRecipes: dataRecipesSlice,
  },
  devTools: true,
});
