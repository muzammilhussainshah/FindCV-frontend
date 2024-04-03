import { createSlice } from '@reduxjs/toolkit';
import { fetchUserByToken } from './userSlice';

export const headerUISlice = createSlice({
  name: 'headerUI',
  initialState: {
    backButtonLink: false,
    showLogoutButton: false
  },
  reducers: {
    setBackButtonLink: (state, action) => {
      state.backButtonLink = action.payload;
    },
    setShowLogoutButton: (state, action) => {
      state.showLogoutButton = action.payload;
      state.registrationProcess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.showLogoutButton = true;
      });
  }
});

export const { setBackButtonLink, setShowLogoutButton } = headerUISlice.actions;

export default headerUISlice.reducer;
