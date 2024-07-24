
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading'; // Import your loading component

const AdminAddVehicle: React.FC = () => {
    const [vehicleId, setVehicleId] = useState<number | ''>('');
    const [rentalRate, setRentalRate] = useState<number | ''>('');
    const [availability, setAvailability] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');
    const [updatedAt, setUpdatedAt] = useState<string>('');
    const [vehicleImage, setVehicleImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response: AxiosResponse<any, any> = await axios.post(
                'http://localhost:8000/api/vehicles',
                {
                    vehicleId,
                    rentalRate,
                    availability,
                    createdAt,
                    updatedAt,
                    vehicleImage
                }
            );

            if (response.status === 201) {
                toast.success('Vehicle added successfully!');
                // Clear fields after successful submission
                setVehicleId('');
                setRentalRate('');
                setAvailability('');
                setCreatedAt('');
                setUpdatedAt('');
                setVehicleImage(null);
                // Reload the page to reflect changes
                window.location.reload();
            } else {
                toast.error('Failed to add vehicle.');
            }
        } catch (error: any) {
            toast.error(`Error adding vehicle: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Vehicle ID</label>
                    <input
                        type="number"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Rental Rate</label>
                    <input
                        type="number"
                        value={rentalRate}
                        onChange={(e) => setRentalRate(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Availability</label>
                    <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Created At</label>
                    <input
                        type="datetime-local"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Updated At</label>
                    <input
                        type="datetime-local"
                        value={updatedAt}
                        onChange={(e) => setUpdatedAt(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-gray-300">Vehicle Image URL</label>
                    <input
                        type="text"
                        value={vehicleImage || ''}
                        onChange={(e) => setVehicleImage(e.target.value || null)}
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Vehicle
                </button>
            </form>

            {loading && <Loading />} {/* Display loading component when loading */}

            <ToastContainer />
        </div>
    );
};

export default AdminAddVehicle;
