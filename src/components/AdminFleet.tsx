



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';

interface FleetManagement {
  fleetId: number;
  vehicleId: number;
  acquisitionDate: string | null;
  depreciationRate: string | null;
  currentValue: string | null;
  maintenanceCost: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = 'http://localhost:8000/api/fleets';

const getToken = () => {
  return localStorage.getItem('authToken');
};

const FleetManagementComponent: React.FC = () => {
  const [data, setData] = useState<FleetManagement[]>([]);
  const [editItem, setEditItem] = useState<FleetManagement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item: FleetManagement) => {
    setEditItem(item);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(data.filter(item => item.fleetId !== id));
      toast.success('Fleet item deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = async () => {
    if (editItem) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }
        await axios.put(`${API_URL}/${editItem.fleetId}`, editItem, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setData(data.map(item =>
          item.fleetId === editItem.fleetId ? editItem : item
        ));
        setEditItem(null);
        toast.success('Fleet item updated successfully!');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>
      {loading ? (
        <div><Loading/></div> // Adjust this to your custom Loading component if needed
      ) : (
        <div className="overflow-x-auto p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform duration-500 hover:scale-105 hover:shadow-xl">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fleet ID</th>
                  <th className="py-2 px-4 border-b">Vehicle ID</th>
                  <th className="py-2 px-4 border-b">Acquisition Date</th>
                  <th className="py-2 px-4 border-b">Depreciation Rate</th>
                  <th className="py-2 px-4 border-b">Current Value</th>
                  <th className="py-2 px-4 border-b">Maintenance Cost</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.fleetId} className="hover:bg-gray-100 transition-colors">
                    <td className="py-2 px-4 border-b">{item.fleetId}</td>
                    <td className="py-2 px-4 border-b">{item.vehicleId}</td>
                    <td className="py-2 px-4 border-b">{item.acquisitionDate ? new Date(item.acquisitionDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{item.depreciationRate || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{item.currentValue || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{item.maintenanceCost || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{item.status}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex">
                        <button
                          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
                          onClick={() => handleDelete(Number(item.fleetId))}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editItem && (
            <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50 shadow-md transition-transform duration-500 hover:scale-105">
              <h2 className="text-lg font-bold mb-2">Edit Fleet Item</h2>
              <label className="block mb-2">
                Vehicle ID:
                <input
                  type="number"
                  value={editItem.vehicleId}
                  onChange={e => setEditItem({ ...editItem, vehicleId: Number(e.target.value) })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Acquisition Date:
                <input
                  type="date"
                  value={editItem.acquisitionDate || ''}
                  onChange={e => setEditItem({ ...editItem, acquisitionDate: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Depreciation Rate:
                <input
                  type="text"
                  value={editItem.depreciationRate || ''}
                  onChange={e => setEditItem({ ...editItem, depreciationRate: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Current Value:
                <input
                  type="text"
                  value={editItem.currentValue || ''}
                  onChange={e => setEditItem({ ...editItem, currentValue: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Maintenance Cost:
                <input
                  type="text"
                  value={editItem.maintenanceCost || ''}
                  onChange={e => setEditItem({ ...editItem, maintenanceCost: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Status:
                <select
                  value={editItem.status}
                  onChange={e => setEditItem({ ...editItem, status: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="Available">Available</option>
                  <option value="In Service">In Service</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Retired">Retired</option>
                </select>
              </label>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">Save</button>
              <button onClick={() => setEditItem(null)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-gray-600">Cancel</button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FleetManagementComponent;
