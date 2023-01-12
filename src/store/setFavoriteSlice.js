import { createSlice } from '@reduxjs/toolkit';

const FAV = 'favorites';

const setFavoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteRecipes: localStorage.getItem(FAV) ? JSON.parse(localStorage.getItem(FAV)) : []
  },
  reducers: {
    addFavorite(state, action) {
      state.favoriteRecipes.push(action.payload);
      localStorage.setItem(FAV, JSON.stringify(state.favoriteRecipes));
    },
    removeFavorite(state, action) {
      state.favoriteRecipes = state.favoriteRecipes.filter((f) => f !== action.payload);
      localStorage.setItem(FAV, JSON.stringify(state.favoriteRecipes));
    },
  },
});

export const { addFavorite, removeFavorite } = setFavoriteSlice.actions;
export default setFavoriteSlice.reducer;
