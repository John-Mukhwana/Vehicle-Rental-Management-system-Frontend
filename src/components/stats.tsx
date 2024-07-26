

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Calendar, DollarSign, Car, Wrench } from 'lucide-react'; // Import icons from Lucide

const Stats = () => {
  const [stats, setStats] = useState({
    people: 0,
    bookings: 0,
    revenue: 0,
    vehicles: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Define the endpoints
        const userEndpoint = 'http://localhost:8000/api/users';
        const bookingsEndpoint = 'http://localhost:8000/api/bookings';
        const vehiclesEndpoint = 'http://localhost:8000/api/vehicles';
        const fleetsEndpoint = 'http://localhost:8000/api/fleets'; // Endpoint for fleet data

        // Fetch token from localStorage
        const token = localStorage.getItem('authToken');

        // Make concurrent requests with authorization headers
        const [userResponse, bookingsResponse, vehiclesResponse, fleetsResponse] = await Promise.all([
          axios.get(userEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(bookingsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(vehiclesEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(fleetsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Extract data from responses
        const totalUsers = userResponse.data.length; // Assuming the response is an array of users
        const bookingsList = bookingsResponse.data; // Assuming the response is an array of bookings
        const totalVehicles = vehiclesResponse.data.length; // Assuming the response is an array of vehicles
        const fleetsList = fleetsResponse.data; // Assuming the response is an array of fleets

        // Calculate total revenue from bookings
        const totalRevenue = bookingsList.reduce((acc: number, booking: { totalAmount: string; }) => {
          const amount = booking.totalAmount ? parseFloat(booking.totalAmount) : 0;
          return acc + amount;
        }, 0);

        // Calculate total maintenance cost from fleets
        const totalMaintenance = fleetsList.reduce((acc: number, fleet: { maintenanceCost: string; }) => {
          const cost = fleet.maintenanceCost ? parseFloat(fleet.maintenanceCost) : 0;
          return acc + cost;
        }, 0);

        // Update state
        setStats({
          people: totalUsers,
          bookings: bookingsList.length,
          revenue: totalRevenue,
          vehicles: totalVehicles,
          maintenance: totalMaintenance,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  // Ensure revenue and maintenance are numbers and default to 0
  const revenueFormatted = typeof stats.revenue === 'number' ? stats.revenue.toFixed(2) : '0.00';
  const maintenanceFormatted = typeof stats.maintenance === 'number' ? stats.maintenance.toFixed(2) : '0.00';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* Number of Users */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-3 bg-blue-100 dark:bg-blue-500 rounded-full">
          <Users className="w-6 h-6 text-blue-500 dark:text-blue-100" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">Users</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.people}</p>
        </div>
      </div>
      {/* Number of Bookings */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-3 bg-green-100 dark:bg-green-500 rounded-full">
          <Calendar className="w-6 h-6 text-green-500 dark:text-green-100" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">Bookings</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.bookings}</p>
        </div>
      </div>
      {/* Revenue */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-500 rounded-full">
          <DollarSign className="w-6 h-6 text-yellow-500 dark:text-yellow-100" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">Revenue</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">${revenueFormatted}</p>
        </div>
      </div>
      {/* Number of Vehicles */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-3 bg-red-100 dark:bg-red-500 rounded-full">
          <Car className="w-6 h-6 text-red-500 dark:text-red-100" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">Vehicles</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.vehicles}</p>
        </div>
      </div>
      {/* Maintenance Cost */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-3 bg-gray-100 dark:bg-gray-500 rounded-full">
          <Wrench className="w-6 h-6 text-gray-500 dark:text-gray-100" />
        </div>
        <div className="ml-3">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">Maintenance Cost</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">${maintenanceFormatted}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
