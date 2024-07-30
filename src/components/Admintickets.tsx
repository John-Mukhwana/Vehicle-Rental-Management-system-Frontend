
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading'; // Adjust the import path as necessary

interface User {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
}

interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const API_URL = 'https://exotravel-vehicle-rental-management.onrender.com/api/tickets';

const getToken = () => {
  return localStorage.getItem('authToken');
};

const TicketUserTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = async (ticketId: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${API_URL}/${ticketId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTickets(tickets.filter(ticket => ticket.ticketId !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleUpdate = async () => {
    if (editingTicket) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }
        await axios.put(`${API_URL}/${editingTicket.ticketId}`, editingTicket, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTickets(tickets.map(ticket =>
          ticket.ticketId === editingTicket.ticketId ? editingTicket : ticket
        ));
        setEditingTicket(null);
        toast.success('Ticket updated successfully!');
      } catch (error) {
        console.error('Error updating ticket:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loading /> // Use your custom Loading component
      ) : (
        <div className="overflow-x-auto p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Tickets</h2>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-2 px-4 border-b">Ticket ID</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                  <th className="py-2 px-4 border-b">Updated At</th>
                  <th className="py-2 px-4 border-b">User ID</th>
                  <th className="py-2 px-4 border-b">Full Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Contact Phone</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map(ticket => (
                  <tr key={ticket.ticketId} className="hover:bg-gray-100 transition-colors">
                    <td className="py-2 px-4 border-b">{ticket.ticketId}</td>
                    <td className="py-2 px-4 border-b">{ticket.subject}</td>
                    <td className="py-2 px-4 border-b">{ticket.description}</td>
                    <td className="py-2 px-4 border-b">{ticket.status}</td>
                    <td className="py-2 px-4 border-b">{new Date(ticket.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(ticket.updatedAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{ticket.user.userId}</td>
                    <td className="py-2 px-4 border-b">{ticket.user.fullName}</td>
                    <td className="py-2 px-4 border-b">{ticket.user.email}</td>
                    <td className="py-2 px-4 border-b">{ticket.user.contactPhone}</td>
                    <td className="py-2 px-4 border-b">{ticket.user.address}</td>
                    <td className="py-2 px-4 border-b">
                       <div className='flex'> 
                      <button onClick={() => handleEdit(ticket)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDelete(ticket.ticketId)} className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600">Delete</button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingTicket && (
            <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50 shadow-md transition-transform duration-500 hover:scale-105">
              <h2 className="text-lg font-bold mb-2">Edit Ticket</h2>
              <label className="block mb-2">
                Subject:
                <input
                  type="text"
                  value={editingTicket.subject}
                  onChange={e => setEditingTicket({ ...editingTicket, subject: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  value={editingTicket.description}
                  onChange={e => setEditingTicket({ ...editingTicket, description: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                  rows={4}
                />
              </label>
              <label className="block mb-2">
                Status:
                <select
                  value={editingTicket.status}
                  onChange={e => setEditingTicket({ ...editingTicket, status: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </label>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">Save</button>
              <button onClick={() => setEditingTicket(null)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-gray-600">Cancel</button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TicketUserTable;
