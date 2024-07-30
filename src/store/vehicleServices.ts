

export const getVehicles = async (): Promise<any[]> => {
  try {
    const response = await fetch('https://exotravel-vehicle-rental-management.onrender.com/api/vehicles');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Ensure data structure matches what your VehicleCard expects
    return data.map((vehicle: any) => ({
      ...vehicle,
      specifications: vehicle.specifications || {
        year: 0,
        fuelType: '',
        transmission: '',
        color: '',
        seatingCapacity: 0,
        features: ''
      },
      fleetManagement: vehicle.fleetManagement || { status: '' }
    }));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};
export default getVehicles;

