import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTickets } from '../apiServer';
import UpdateTicket from './UpdateTicket'; // Import the UpdateTicket component
import { Ticket } from '../types';

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets();
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleEditTicketClick = (id: any) => {
    navigate(`/tickets/update/${id}`); // Redirect to the UpdateTicket component with ticket ID
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Ticket List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{ticket.subject}</h2>
            <p className="text-gray-700 mb-4">{ticket.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Status: <span className={ticket.status === 'open' ? 'text-green-600' : 'text-red-600'}>{ticket.status}</span></p>
              <button onClick={() => handleEditTicketClick(ticket.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
