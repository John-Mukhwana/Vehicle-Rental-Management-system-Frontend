



import React, { useState } from 'react';
import VehicleDetailsModal from './VehicleDetailsModal';
import BookingModal from './userBookingModal';

interface Vehicle {
  vehicleId: number;
  rentalRate: string; // Keep rentalRate as a string
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

interface VehicleCardProps {
  vehicle: Vehicle;
  userId: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, userId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="relative mb-4">
        {vehicle.vehicleImage ? (
          <img
            src={vehicle.vehicleImage}
            alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`}
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-700"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">No Image</p>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2 dark:text-white">{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
      <p className=" dark:text-white"><span className="font-bold">Year:</span> {vehicle.specifications.year}</p>
      <p  className=" dark:text-white"><span className="font-bold">Fuel Type:</span> {vehicle.specifications.fuelType}</p>
      <p className=" dark:text-white"><span className="font-bold">Transmission:</span> {vehicle.specifications.transmission}</p>
      <p  className=" dark:text-white"><span className="font-bold">Color:</span> {vehicle.specifications.color}</p>
      <p className=" dark:text-white"><span className="font-bold">Seating Capacity:</span> {vehicle.specifications.seatingCapacity}</p>
      <p className=" dark:text-white"><span className="font-bold">Features:</span> {vehicle.specifications.features}</p>
      <p  className=" dark:text-white"><span className="font-bold">Status:</span> {vehicle.fleetManagement.status}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setShowDetails(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          More Details
        </button>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Book
        </button>
      </div>
      {showDetails && <VehicleDetailsModal vehicle={vehicle} onClose={() => setShowDetails(false)} />}
      {showBooking && <BookingModal vehicleId={vehicle.vehicleId} userId={userId} isOpen={showBooking} onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default VehicleCard;