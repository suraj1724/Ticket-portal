import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from '../types';
import { getAllTickets } from '../apiServer';

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

  const handleCreateTicketClick = () => {
    navigate('/createTicket');
  };

  const handleEditTicketClick = (ticketId: any) => {
    navigate(`/tickets/update/${ticketId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Ticket List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{ticket.subject}</h2>
            <p className="text-gray-700 mb-4">{ticket.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className={`text-gray-600 ${ticket.status === 'open' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {ticket.status}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleEditTicketClick(ticket.id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateTicketClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Create Ticket
      </button>
    </div>
  );
};

export default TicketList;
