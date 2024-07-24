
import React, { useState, useEffect } from 'react';
import { getVehicles, deleteVehicle, updateVehicle } from '../store/vehicleTableservices'; // Update import path
import Loading from './loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Vehicle {
  vehicleId: number;
  rentalRate: string;
  availability: string;
  vehicleImage: string;
  specifications: {
    manufacturer: string;
    model: string;
    year: number;
    fuelType: string;
    transmission: string;
    color: string;
    seatingCapacity: number;
    features: string;
  };
  fleetManagement: {
    status: string;
  };
}

const AdminVehicleTable: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<Pick<Vehicle, 'rentalRate' | 'availability' | 'vehicleImage'>>>({});

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId: number) => {
    try {
      await deleteVehicle(vehicleId);
      toast.success('Vehicle deleted successfully');
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to delete vehicle');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setCurrentVehicle(vehicle);
    setFormData({
      rentalRate: vehicle.rentalRate,
      availability: vehicle.availability,
      vehicleImage: vehicle.vehicleImage,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (currentVehicle && formData) {
      try {
        const updatedVehicle = { ...currentVehicle, ...formData };
        await updateVehicle(updatedVehicle);
        toast.success('Vehicle updated successfully');
        setIsEditing(false);
        setCurrentVehicle(null);
        fetchVehicles();
      } catch (error) {
        toast.error('Failed to update vehicle');
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setCurrentVehicle(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Vehicle Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:text-white border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Rental Rate</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Availability</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Vehicle Image</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Manufacturer</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Model</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Year</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Fuel Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Transmission</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Color</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Seating Capacity</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Features</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicleId} className="border-b hover:bg-gray-50 dark:text-white dark:hover:bg-green-900">
                <td className="py-3 px-4">{vehicle.vehicleId}</td>
                <td className="py-3 px-4">{vehicle.rentalRate}</td>
                <td className="py-3 px-4">{vehicle.availability}</td>
                <td className="py-3 px-4">
                  <img src={vehicle.vehicleImage} alt="Vehicle" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{vehicle.specifications.manufacturer}</td>
                <td className="py-3 px-4">{vehicle.specifications.model}</td>
                <td className="py-3 px-4">{vehicle.specifications.year}</td>
                <td className="py-3 px-4">{vehicle.specifications.fuelType}</td>
                <td className="py-3 px-4">{vehicle.specifications.transmission}</td>
                <td className="py-3 px-4">{vehicle.specifications.color}</td>
                <td className="py-3 px-4">{vehicle.specifications.seatingCapacity}</td>
                <td className="py-3 px-4">{vehicle.specifications.features}</td>
                <td className="py-3 px-4">{vehicle.fleetManagement.status}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(vehicle.vehicleId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && currentVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="rentalRate" className="block text-gray-700">Rental Rate</label>
                <input
                  id="rentalRate"
                  name="rentalRate"
                  type="text"
                  value={formData.rentalRate}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="availability" className="block text-gray-700">Availability</label>
                <input
                  id="availability"
                  name="availability"
                  type="text"
                  value={formData.availability}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="vehicleImage" className="block text-gray-700">Vehicle Image</label>
                <input
                  id="vehicleImage"
                  name="vehicleImage"
                  type="text"
                  value={formData.vehicleImage}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default AdminVehicleTable;
