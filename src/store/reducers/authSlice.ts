// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  userType: 'end-user' | 'tech-support' | 'admin' | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userType: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ userEmail: string; userType: string }>) {
      state.isLoggedIn = true;
      state.userEmail = action.payload.userEmail;
      state.userType = action.payload.userType as 'end-user' | 'tech-support' | 'admin';
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userType = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
