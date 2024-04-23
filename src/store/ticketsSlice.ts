import { createSlice } from '@reduxjs/toolkit';
import { fetchAllTickets, createTicket, deleteTicket } from './thunks/ticketsThunks';

const initialState = {
  tickets: [],
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.error = null; // Reset error on successful fetch
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.error = action.error.message; // Set error message on fetch failure
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        // Handle ticket creation success if needed
        state.error = null; // Reset error on successful creation
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.error = action.error.message; // Set error message on creation failure
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        // Handle ticket deletion success if needed
        state.error = null; // Reset error on successful deletion
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.error = action.error.message; // Set error message on deletion failure
      });
  },
});

export default ticketsSlice.reducer;
