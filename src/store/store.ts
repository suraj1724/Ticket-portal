import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketsReducer,
  },
});

export default store;
