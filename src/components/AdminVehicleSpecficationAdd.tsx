

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAddVehicleSpecifications: React.FC = () => {
    const [formData, setFormData] = useState({
        vehicleId: 0,
        manufacturer: '',
        model: '',
        year: 0,
        fuelType: '',
        engineCapacity: '',
        transmission: '',
        seatingCapacity: 0,
        color: '',
        features: [] as string[], // Ensure features is an array
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            features: value.split(',').map(feature => feature.trim()), // Convert comma-separated values to array
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('https://exotravel-vehicle-rental-management.onrender.com/api/vehicleSpecifications', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Vehicle specification added successfully!');
            // Clear form fields
            setFormData({
                vehicleId: 0,
                manufacturer: '',
                model: '',
                year: 0,
                fuelType: '',
                engineCapacity: '',
                transmission: '',
                seatingCapacity: 0,
                color: '',
                features: [] // Reset features to empty array
            });
        } catch (error: any) {
            toast.error('Error adding vehicle specification: ' + (error?.response?.data?.message || error?.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add Vehicle Specifications</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle ID</label>
                        <input
                            type="number"
                            id="vehicleId"
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturer</label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fuel Type</label>
                        <input
                            type="text"
                            id="fuelType"
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Engine Capacity</label>
                        <input
                            type="text"
                            id="engineCapacity"
                            name="engineCapacity"
                            value={formData.engineCapacity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Transmission</label>
                        <input
                            type="text"
                            id="transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Seating Capacity</label>
                        <input
                            type="number"
                            id="seatingCapacity"
                            name="seatingCapacity"
                            value={formData.seatingCapacity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="features" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features (comma-separated)</label>
                        <input
                            type="text"
                            id="features"
                            name="features"
                            value={formData.features.join(', ')} // Display as comma-separated
                            onChange={handleFeaturesChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Specification'}
                </button>
            </form>
            <ToastContainer className="mt-4" />
        </div>
    );
};

export default AdminAddVehicleSpecifications;
