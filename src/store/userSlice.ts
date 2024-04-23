import { createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser } from './thunks/userThunks';

const initialState = {
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.error = null; // Reset error on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message; // Set error message on login failure
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // Handle user creation success if needed
        state.error = null; // Reset error on successful user creation
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message; // Set error message on user creation failure
      });
  },
});

export default userSlice.reducer;
