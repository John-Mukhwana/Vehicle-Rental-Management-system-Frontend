// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pencil, Trash, Plus } from 'lucide-react'; // Import icons from Lucide

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   // Add other fields if your API returns more details
// }

// const AdminUserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '' });
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/users');
//         console.log('API Response:', response.data); // Log the full API response
//         setUsers(response.data);
//       } catch (error) {
//         setError('Error fetching users');
//         console.error('API Error:', error); // Log the error details
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleEdit = (user: User) => {
//     setEditingUser(user);
//   };

//   const handleDelete = async (userId: number) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/users/${userId}`);
//       setUsers(users.filter(user => user.id !== userId));
//     } catch (error) {
//       setError('Error deleting user');
//       console.error('API Error:', error); // Log the error details
//     }
//   };

//   const handleSave = async () => {
//     if (editingUser) {
//       try {
//         await axios.put(`http://localhost:8000/api/users/${editingUser.id}`, editingUser);
//         setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
//         setEditingUser(null);
//       } catch (error) {
//         setError('Error updating user');
//         console.error('API Error:', error); // Log the error details
//       }
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/users', newUser);
//       console.log('User Created:', response.data); // Log the created user details
//       setUsers([...users, response.data]);
//       setNewUser({ name: '', email: '', role: '' });
//     } catch (error) {
//       setError('Error creating user');
//       console.error('API Error:', error); // Log the error details
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (editingUser) {
//       setEditingUser({ ...editingUser, [name]: value });
//     } else {
//       setNewUser({ ...newUser, [name]: value });
//     }
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">Create New User</h3>
//         <div className="flex flex-col space-y-4 mb-4">
//           <input
//             type="text"
//             name="name"
//             value={newUser.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             value={newUser.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="role"
//             value={newUser.role}
//             onChange={handleChange}
//             placeholder="Role"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <button
//             onClick={handleCreate}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             <Plus className="w-4 h-4 inline" /> Create User
//           </button>
//         </div>
//       </div>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Email</th>
//             <th className="border border-gray-300 p-2">Role</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td className="border border-gray-300 p-2">
//                 {editingUser?.id === user.id ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={editingUser.name}
//                     onChange={handleChange}
//                     className="p-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   user.name
//                 )}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {editingUser?.id === user.id ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={editingUser.email}
//                     onChange={handleChange}
//                     className="p-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   user.email
//                 )}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 {editingUser?.id === user.id ? (
//                   <input
//                     type="text"
//                     name="role"
//                     value={editingUser.role}
//                     onChange={handleChange}
//                     className="p-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="border border-gray-300 p-2 flex space-x-2">
//                 {editingUser?.id === user.id ? (
//                   <>
//                     <button
//                       onClick={handleSave}
//                       className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingUser(null)}
//                       className="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="text-blue-500 hover:text-blue-600"
//                     >
//                       <Pencil className="w-4 h-4 inline" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       <Trash className="w-4 h-4 inline" />
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserManagement;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/users';

// interface Ticket {
//   ticketId: number;
//   subject: string;
//   description: string;
//   status: string; // Adjust the type if you have specific enum values for status
// }

// interface User {
//   userId: number;
//   fullName: string;
//   email: string;
//   contactPhone: string;
//   address: string;
//   role: string;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   customerSupportTickets: Ticket[];
// }

// const Users: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get<User[]>(API_URL);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleEdit = (user: User) => {
//     setEditUser(user);
//   };

//   const handleSave = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!editUser) return;

//     try {
//       const response = await axios.put<User>(`${API_URL}/${editUser.userId}`, editUser);
//       const updatedUserData = response.data;
//       setUsers(users.map(user => (user.userId === updatedUserData.userId ? updatedUserData : user)));
//       setEditUser(null);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleDelete = async (userId: number) => {
//     try {
//       await axios.delete(`${API_URL}/${userId}`);
//       setUsers(users.filter(user => user.userId !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   // Format date string to a more readable format
//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       timeZoneName: 'short',
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">User List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">User ID</th>
//               <th className="border px-4 py-2">Full Name</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Contact Phone</th>
//               <th className="border px-4 py-2">Address</th>
//               <th className="border px-4 py-2">Role</th>
//               <th className="border px-4 py-2">Created At</th>
//               <th className="border px-4 py-2">Updated At</th>
//               <th className="border px-4 py-2">Tickets</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {editUser && (
//               <tr className="bg-gray-100 border-b border-gray-200">
//                 <td className="border px-4 py-2">Editing</td>
//                 <td className="border px-4 py-2">
//                   <form onSubmit={handleSave} className="space-y-4">
//                     <label className="block">
//                       Full Name:
//                       <input
//                         type="text"
//                         value={editUser.fullName}
//                         onChange={e => setEditUser({ ...editUser, fullName: e.target.value })}
//                         className="border rounded p-2 w-full"
//                       />
//                     </label>
//                     <label className="block">
//                       Email:
//                       <input
//                         type="email"
//                         value={editUser.email}
//                         onChange={e => setEditUser({ ...editUser, email: e.target.value })}
//                         className="border rounded p-2 w-full"
//                       />
//                     </label>
//                     <label className="block">
//                       Contact Phone:
//                       <input
//                         type="text"
//                         value={editUser.contactPhone}
//                         onChange={e => setEditUser({ ...editUser, contactPhone: e.target.value })}
//                         className="border rounded p-2 w-full"
//                       />
//                     </label>
//                     <label className="block">
//                       Address:
//                       <input
//                         type="text"
//                         value={editUser.address}
//                         onChange={e => setEditUser({ ...editUser, address: e.target.value })}
//                         className="border rounded p-2 w-full"
//                       />
//                     </label>
//                     <label className="block">
//                       Role:
//                       <input
//                         type="text"
//                         value={editUser.role}
//                         onChange={e => setEditUser({ ...editUser, role: e.target.value })}
//                         className="border rounded p-2 w-full"
//                       />
//                     </label>
//                     <button
//                       type="submit"
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditUser(null)}
//                       className="bg-gray-500 text-white px-4 py-2 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </form>
//                 </td>
//                 <td className="border px-4 py-2" colSpan={8}></td>
//               </tr>
//             )}
//             {users.map(user => (
//               <tr key={user.userId}>
//                 <td className="border px-4 py-2">{user.userId}</td>
//                 <td className="border px-4 py-2">{user.fullName}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2">{user.contactPhone}</td>
//                 <td className="border px-4 py-2">{user.address}</td>
//                 <td className="border px-4 py-2">{user.role}</td>
//                 <td className="border px-4 py-2">{formatDate(user.createdAt)}</td>
//                 <td className="border px-4 py-2">{formatDate(user.updatedAt)}</td>
//                 <td className="border px-4 py-2">
//                   {user.customerSupportTickets.length > 0 ? (
//                     <ul className="list-disc pl-4">
//                       {user.customerSupportTickets.map(ticket => (
//                         <li key={ticket.ticketId}>
//                           <strong>Subject:</strong> {ticket.subject} <br />
//                           <strong>Status:</strong> {ticket.status} <br />
//                           <strong>Description:</strong> {ticket.description}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No tickets</p>
//                   )}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                     onClick={() => handleEdit(user)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                     onClick={() => handleDelete(user.userId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Users;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/loading';

const API_URL = 'http://localhost:8000/api/users';

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
