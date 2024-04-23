import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password, userType }, { rejectWithValue }) => {
  try {
    const response = await api.get('/users');
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid user data');
    }
    const user = response.data.find(u => u.email === email && u.password === password && u.type === userType);
    return !!user;
  } catch (error) {
    console.error('Error:', error);
    return rejectWithValue('An error occurred while logging in');
  }
});

export const createUser = createAsyncThunk('user/create', async ({ username, email, password, type }, { rejectWithValue }) => {
  try {
    const response = await api.post('/users', { username, email, password, type });
    return !!response.data;
  } catch (error) {
    console.error('Error:', error);
    return rejectWithValue('An error occurred while creating user');
  }
});
