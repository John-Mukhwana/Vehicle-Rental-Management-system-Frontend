

import React, { useEffect, useState } from 'react';
import VehicleCard from './vehicleCard';
import Loading from './loading';
import getVehicles from '../store/vehicleServices';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const vehiclesData = await getVehicles();
      setVehicles(vehiclesData);
      setLoading(false);
    };

    const fetchUserId = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }
    };

    fetchVehicles();
    fetchUserId();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {vehicles.map(vehicle => (
        <VehicleCard
          key={vehicle.vehicleId}
          vehicle={vehicle}
          userId={userId ?? 0} // Use nullish coalescing operator to ensure userId is always a number
        />
      ))}
    </div>
  );
};

export default VehicleList;
