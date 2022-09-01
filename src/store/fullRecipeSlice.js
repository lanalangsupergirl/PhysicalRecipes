import { createSlice } from '@reduxjs/toolkit';

const fullRecipeSlice = createSlice({
  name: 'fullRecipe',
  initialState: {
    isFullRecipe: false,
    recipeId: null,
  },
  reducers: {
    showFullRecipe(state, action) {
      state.isFullRecipe = action.payload;
    },
    currentRecipeId(state, action) {
      state.recipeId = action.payload;
    },
  },
});

export const { showFullRecipe, currentRecipeId } = fullRecipeSlice.actions;
export default fullRecipeSlice.reducer;
