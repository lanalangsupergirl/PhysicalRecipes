// import { createSlice } from '@reduxjs/toolkit';

// const dataRecipesSlice = createSlice({
//   name: 'recipes',
//   initialState: {
//     dataRecipes: [],
//   },
//   reducers: {
//     getRecipes(state, action) {
//       state.dataRecipes = action.payload;
//     },
//   },
// });

// export const { getRecipes } = dataRecipesSlice.actions;
// export default dataRecipesSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import recipes from '../recipes.json';

const data = recipes;

const dataRecipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    dataRecipes: data.recipes || [],
  },
  reducers: {
    getRecipes(state, action) {
      state.dataRecipes = action.payload;
    },
  },
});

export const { getRecipes } = dataRecipesSlice.actions;
export default dataRecipesSlice.reducer;
