import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LocationAndBranch {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

const LocationAndBranches: React.FC = () => {
  const [data, setData] = useState<LocationAndBranch[]>([]);
  const [editItem, setEditItem] = useState<LocationAndBranch | null>(null);
  const [editForm, setEditForm] = useState<LocationAndBranch>({
    locationId: 0,
    name: '',
    address: '',
    contactPhone: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const fetchData = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('https://exotravel-vehicle-rental-management.onrender.com/api/locationAndBranches', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (item: LocationAndBranch) => {
    setEditItem(item);
    setEditForm(item);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }

      // Log data being sent to the server
      console.log('Sending data:', editForm);

      await axios.put(`https://exotravel-vehicle-rental-management.onrender.com/api/locationAndBranches/${editForm.locationId}`, editForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchData();
      setEditItem(null);
      toast.success('Details updated successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`https://exotravel-vehicle-rental-management.onrender.com/api/locationAndBranches/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Location and Branches Management</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">Location ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Address</th>
              <th className="py-2 px-4 border-b text-left">Contact Phone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.locationId} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.locationId}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.address}</td>
                <td className="py-2 px-4 border-b">{item.contactPhone}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(Number(item.locationId))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Edit Location and Branch</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={editForm.contactPhone}
                  onChange={handleEditChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleEditSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LocationAndBranches;
