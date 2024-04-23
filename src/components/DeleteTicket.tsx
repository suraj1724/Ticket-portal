import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from '../types';
import { getAllTickets, deleteTicket } from '../apiServer';

const DeleteTicket = () => {
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

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      const deleteSuccess = await deleteTicket(ticketId);
      if (deleteSuccess) {
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        alert('Ticket deleted successfully');
      } else {
        alert('Failed to delete ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('An error occurred while deleting ticket');
    }
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
              <div>
                <p className="text-gray-600">Attachments:</p>
                <ul className="list-disc list-inside">
                  {ticket.attachments && Array.isArray(ticket.attachments) && (
                    <div>
                      <p className="text-gray-600">Attachments:</p>
                      <ul className="list-disc list-inside">
                        {ticket.attachments.map((attachment: any, index: any) => (
                          <li key={index} className="text-gray-600">{attachment}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <button onClick={() => handleDeleteTicket(ticket.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete Ticket
            </button>
          </div>
        ))}
        <button onClick={handleCreateTicketClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Ticket
        </button>
      </div>
    </div>
  );
};

export default DeleteTicket;
