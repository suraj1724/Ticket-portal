
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Ticket } from '../types';
import { updateTicket, getTicketById } from '../apiServer';
import { checkUserRole } from '../apiServer'; 

const UpdateOne = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open')
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const fetchedTicket = await getTicketById(id);
        setTicket(fetchedTicket);
        setSubject(fetchedTicket.subject);
        setDescription(fetchedTicket.description);
        setStatus(fetchedTicket.status); 
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, [id]); 

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userRole = await checkUserRole();
        setIsAdmin(userRole === 'admin');
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    getUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!subject || !description) {
        alert('Please fill in all fields');
        return;
      }

      const updatedTicketData = {
        id,
        subject,
        description,
        status,
      };

      const updateSuccess = await updateTicket(id, updatedTicketData);
      if (updateSuccess) {
        alert('Ticket updated successfully');
        navigate('/dashboard'); 
      } else {
        alert('Failed to update ticket');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating ticket');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Update Ticket</h1>
      {ticket && (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter subject"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            ></textarea>
          </div>
          {isAdmin && ( 
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="open">Open</option>
                <option value="close">Close</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Ticket
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateOne;
