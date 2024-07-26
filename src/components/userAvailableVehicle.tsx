

import React, { useEffect, useState } from 'react';
import VehicleCard from './vehicleCard';

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

const AvailableVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/vehicles');
        const data: Vehicle[] = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const availableVehicles = vehicles.filter(vehicle => vehicle.availability.toLowerCase() === 'available');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {availableVehicles.map(vehicle => (
        <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} userId={0} />
      ))}
    </div>
  );
};

export default AvailableVehicles;
