import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TicketList from './TicketList';
import CreateTicket from './CreateTicket';
import { deleteTicket } from '../apiServer';
import DeleteTicket from './DeleteTicket';
import UpdateTicket from './UpdateTicket';
import UpdateOne from './updateOne';

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState('viewTickets');

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 text-white h-full">
        <div className="p-4 h-full">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActivePanel('viewTickets')}
                className={`flex items-center space-x-2 ${activePanel === 'viewTickets' ? 'bg-gray-700' : ''}`}
              >
                <FontAwesomeIcon icon={faTicket} />
                <span>View My Tickets</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePanel('createTicket')}
                className={`flex items-center space-x-2 ${activePanel === 'createTicket' ? 'bg-gray-700' : ''}`}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Create Ticket</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePanel('updateTicket')}
                className={`flex items-center space-x-2 ${activePanel === 'updateTicket' ? 'bg-gray-700' : ''}`}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Update Ticket</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePanel('deleteTicket')}
                className={`flex items-center space-x-2 ${activePanel === 'deleteTicket' ? 'bg-gray-700' : ''}`}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete Ticket</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Right Panel */}
      <div className="w-full md:w-3/4 lg:w-4/5 bg-gray-100 h-full">
        {activePanel === 'viewTickets' && <TicketList />}
        {activePanel === 'createTicket' && <CreateTicket/>}
        {activePanel === 'updateTicket' && <UpdateTicket/>}
        {activePanel === 'deleteTicket' && <DeleteTicket/>}
        {activePanel === 'updateOne' && <UpdateOne/>}
      </div>
    </div>
  );
};

export default Dashboard;
