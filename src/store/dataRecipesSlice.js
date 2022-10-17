import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async function (_, {rejectWithValue}) {
  try {
    const response = await fetch('http://localhost:8080/recipes');

    if (!response.ok) {
      throw new Error('Server Error')
    }

    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

const dataRecipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    dataRecipes: [],
    status: null,
    error: null,
  },
  // reducers: {
  //   getRecipes(state, action) {
  //     state.dataRecipes = action.payload;
  //   },
  // },
  extraReducers: {
    [fetchRecipes.pending]: (state) => {
      (state.status = 'loading'),
      (state.error = null);
    },
    [fetchRecipes.fulfilled]: (state, action) => {
      (state.status = 'resolved'),
      (state.dataRecipes = action.payload);
    },
    [fetchRecipes.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload
    },
  },
});

export const { getRecipes } = dataRecipesSlice.actions;
export default dataRecipesSlice.reducer;
