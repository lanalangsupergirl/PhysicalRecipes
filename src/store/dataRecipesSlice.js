import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:8080/recipes', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Server Error');
      }

      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchRecipe = createAsyncThunk(
  'recipes/fetchRecipe',
  async function (id, { rejectWithValue }) {
    try {
      console.log('id', id)
      const response = await fetch(`http://localhost:8080/recipe/id=${id}`);

      if (!response.ok) {
        throw new Error('Server Error');
      }

      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const dataRecipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    dataRecipes: [],
    recipe: {},
    status: null,
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchRecipes.pending]: (state) => {
      (state.status = 'loading'), (state.error = null);
    },
    [fetchRecipes.fulfilled]: (state, action) => {
      (state.status = 'resolved'), (state.dataRecipes = action.payload);
    },
    [fetchRecipes.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchRecipe.pending]: (state) => {
      (state.status = 'loading'), (state.error = null);
    },
    [fetchRecipe.fulfilled]: (state, action) => {
      (state.status = 'resolved'), (state.recipe = action.payload);
    },
    [fetchRecipe.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

// export const { getId } = dataRecipesSlice.actions;
export default dataRecipesSlice.reducer;
