import React, { useState } from 'react';
import { createTicket } from '../apiServer';
import { Navigator, useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!subject || !description || !attachment) {
        alert('Please fill in all fields and attach a file');
        return;
      }

      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('attachment', attachment);

      const createSuccess = await createTicket(formData);
      if (createSuccess) {
        alert('Ticket created successfully');
        navigate("/tickets")
        // Redirect or perform any other action upon successful ticket creation
      } else {
        alert('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating ticket');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Create Ticket</h1>
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
        <div className="mb-4">
          <label htmlFor="attachment" className="block text-gray-700 text-sm font-bold mb-2">
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
