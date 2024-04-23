import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/Signup';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';
import Dashboard from './components/Dashboard';
import { updateTicket } from './apiServer';
import UpdateTicket from './components/UpdateTicket';
import UpdateOne from './components/updateOne';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
    <Routes>
        <Route  path="/" Component={Login} />
        <Route  path="/signup" Component={Signup} />
        <Route path="/tickets" Component={TicketList} />
        <Route path="/createTicket" Component={CreateTicket} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/tickets/${ticketId" Component={UpdateTicket} />
        <Route path="/tickets/update/:id" Component={UpdateOne} />
        </Routes>   
    </Router>
    </Provider>
  );
};

export default App;
