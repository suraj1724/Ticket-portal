import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllTickets = createAsyncThunk('tickets/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/tickets');
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid ticket data');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return rejectWithValue('An error occurred while fetching tickets');
  }
});

export const createTicket = createAsyncThunk('tickets/create', async (ticketData, { rejectWithValue }) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return !!response.data;
  } catch (error) {
    console.error('Error:', error);
    return rejectWithValue('An error occurred while creating ticket');
  }
});

export const deleteTicket = createAsyncThunk('tickets/delete', async (ticketId, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/tickets/${ticketId}`);
    return !!response.data;
  } catch (error) {
    console.error('Error:', error);
    return rejectWithValue('An error occurred while deleting ticket');
  }
});
