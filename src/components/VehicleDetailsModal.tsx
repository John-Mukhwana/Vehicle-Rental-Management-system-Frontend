
import React from 'react';

interface Vehicle {
  vehicleId: number;
  rentalRate: string;
  availability: string;
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
  vehicleImage: string;
}

interface VehicleDetailsPopupProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsPopupProps> = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Details</h2>
          <button onClick={onClose} className="text-gray-900 dark:text-white">
            &times;
          </button>
        </div>
        {vehicle.vehicleImage && (
          <img
            src={vehicle.vehicleImage}
            alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Vehicle ID:</span> {vehicle.vehicleId}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Manufacturer:</span> {vehicle.specifications.manufacturer}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Model:</span> {vehicle.specifications.model}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Year:</span> {vehicle.specifications.year}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Fuel Type:</span> {vehicle.specifications.fuelType}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Transmission:</span> {vehicle.specifications.transmission}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Color:</span> {vehicle.specifications.color}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Seating Capacity:</span> {vehicle.specifications.seatingCapacity}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Features:</span> {vehicle.specifications.features}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-bold">Status:</span> {vehicle.fleetManagement.status}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;