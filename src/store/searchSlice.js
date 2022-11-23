import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    flag: false,
    searchInput: '',
    hideBar: false,
  },
  reducers: {
    changeFlag(state, action) {
      state.flag = action.payload;
    },
    searchInputChange(state, action) {
      state.searchInput = action.payload;
    },
    clearSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    hideSearchBar(state, action) {
      state.hideBar = action.payload;
    },
  },
});

export const { changeFlag, searchInputChange, clearSearchInput, hideSearchBar } =
  searchSlice.actions;
export default searchSlice.reducer;
