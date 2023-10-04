import { createSlice } from '@reduxjs/toolkit';

const isLogInSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {
    isLogIn(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { isLogIn } = isLogInSlice.actions;
export default isLogInSlice.reducer;