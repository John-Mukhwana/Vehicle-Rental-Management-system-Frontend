
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/loading';

const API_URL = 'https://exotravel-vehicle-rental-management.onrender.com/api/users';

interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string; // Adjust the type if you have specific enum values for status
}

interface User {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  customerSupportTickets: Ticket[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditUser(user);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editUser) return;

    try {
      const response = await axios.put<User>(`${API_URL}/${editUser.userId}`, editUser);
      const updatedUserData = response.data;
      setUsers(users.map(user => (user.userId === updatedUserData.userId ? updatedUserData : user)));
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {loading ? (
        <Loading/>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Contact Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Updated At</th>
              <th className="border px-4 py-2">Tickets</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editUser && (
              <tr className="bg-gray-100 border-b border-gray-200">
                <td className="border px-4 py-2">Editing</td>
                <td className="border px-4 py-2" colSpan={8}>
                  <form onSubmit={handleSave} className="space-y-4">
                    <label className="block">
                      Full Name:
                      <input
                        type="text"
                        value={editUser.fullName}
                        onChange={e => setEditUser({ ...editUser, fullName: e.target.value })}
                        className="border rounded p-2 w-full"
                      />
                    </label>
                    <label className="block">
                      Email:
                      <input
                        type="email"
                        value={editUser.email}
                        onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                        className="border rounded p-2 w-full"
                      />
                    </label>
                    <label className="block">
                      Contact Phone:
                      <input
                        type="text"
                        value={editUser.contactPhone}
                        onChange={e => setEditUser({ ...editUser, contactPhone: e.target.value })}
                        className="border rounded p-2 w-full"
                      />
                    </label>
                    <label className="block">
                      Address:
                      <input
                        type="text"
                        value={editUser.address}
                        onChange={e => setEditUser({ ...editUser, address: e.target.value })}
                        className="border rounded p-2 w-full"
                      />
                    </label>
                    <label className="block">
                      Role:
                      <input
                        type="text"
                        value={editUser.role}
                        onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                        className="border rounded p-2 w-full"
                      />
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditUser(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
            )}
            {users.map(user => (
              <tr key={user.userId}>
                <td className="border px-4 py-2">{user.userId}</td>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.contactPhone}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{formatDate(user.createdAt)}</td>
                <td className="border px-4 py-2">{formatDate(user.updatedAt)}</td>
                <td className="border px-4 py-2">
                  {user.customerSupportTickets.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {user.customerSupportTickets.map(ticket => (
                        <li key={ticket.ticketId}>
                          <strong>Subject:</strong> {ticket.subject} <br />
                          <strong>Status:</strong> {ticket.status} <br />
                          <strong>Description:</strong> {ticket.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No tickets</p>
                  )}
                </td>
                <td className="flex gap-4 border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
