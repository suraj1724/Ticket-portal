import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Adjust baseURL according to your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email: string, password: string, userType: string): Promise<boolean> => {
  try {
    const response = await api.get('/users');
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid user data');
    }
    const user = response.data.find((u: any) => u.email === email && u.password === password && u.type === userType);
    return !!user;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while logging in');
  }
};


export const createUser = async (username: string, email: string, password: string, type: string): Promise<boolean> => {
    try {
      const response = await api.post('/users', { username, email, password, type: type });
      console.log(response, "response")
      return !!response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while creating user');
    }
  };
  
  export const getAllTickets = async () => {
    try {
      const response = await api.get('/tickets');
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid ticket data');
      }
      console.log(response.data, "here are all tickets");
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error; 
    }
  };

  export const createTicket = async (ticketData: any): Promise<boolean> => {
    try {
      const response = await api.post('/tickets', ticketData);
      return !!response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while creating ticket');
    }
  };


  export const deleteTicket = async (ticketId: any): Promise<boolean> => {
    try {
      const response = await api.delete(`/tickets/${ticketId}`);
      return !!response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while deleting ticket');
    }
  };
  

  export const getTicketById = async (id: any) => {
    try {
      const response = await api.get(`/tickets/${id}`);
      if (!response.data) {
        throw new Error('Ticket not found');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket by ID:', error);
      throw error;
    }
  };

  export const updateTicket = async (ticketId: any, updatedTicketData: any): Promise<boolean> => {
    try {
      const response = await api.put(`/tickets/${ticketId}`, updatedTicketData);
      return !!response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while updating ticket');
    }
  };
  