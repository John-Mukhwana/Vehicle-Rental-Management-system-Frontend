
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stats from './stats';
import Loading from './loading';

const Reports: React.FC = () => {
  const [stats, setStats] = useState({
    people: 0,
    bookings: 0,
    revenue: 0,
    vehicles: 0,
    maintenance: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number }[]>([]);
  const [highDepreciationVehicles, setHighDepreciationVehicles] = useState<{
    id: string;
    manufacturer: string;
    model: string;
    fuelType: string;
    engineCapacity: string;
    depreciationRate: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEndpoint = 'https://exotravel-vehicle-rental-management.onrender.com/api/users';
        const bookingsEndpoint = 'https://exotravel-vehicle-rental-management.onrender.com/api/bookings';
        const vehiclesEndpoint = 'https://exotravel-vehicle-rental-management.onrender.com/api/vehicles';
        const fleetsEndpoint = 'https://exotravel-vehicle-rental-management.onrender.com/api/fleets';
        const vehicleSpecsEndpoint = 'https://exotravel-vehicle-rental-management.onrender.com/api/vehicleSpecifications';

        const token = localStorage.getItem('authToken');

        const [userResponse, bookingsResponse, vehiclesResponse, fleetsResponse, vehicleSpecsResponse] = await Promise.all([
          axios.get(userEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(bookingsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(vehiclesEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(fleetsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(vehicleSpecsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const totalUsers = userResponse.data.length;
        const bookingsList = bookingsResponse.data;
        const totalVehicles = vehiclesResponse.data.length;
        const fleetsList = fleetsResponse.data;
        const vehicleSpecsList = vehicleSpecsResponse.data;

        const totalRevenue = bookingsList.reduce((acc: number, booking: { totalAmount: string; }) => {
          const amount = booking.totalAmount ? parseFloat(booking.totalAmount) : 0;
          return acc + amount;
        }, 0);

        const totalMaintenance = fleetsList.reduce((acc: number, fleet: { maintenanceCost: string; }) => {
          const cost = fleet.maintenanceCost ? parseFloat(fleet.maintenanceCost) : 0;
          return acc + cost;
        }, 0);

        setStats({
          people: totalUsers,
          bookings: bookingsList.length,
          revenue: totalRevenue,
          vehicles: totalVehicles,
          maintenance: totalMaintenance,
        });

        const monthlyData: { [key: string]: number } = {};
        bookingsList.forEach((booking: { bookingDate: string | number | Date; totalAmount: string; }) => {
          const date = new Date(booking.bookingDate);
          const month = date.getMonth();
          const year = date.getFullYear();
          const monthYear = `${year}-${month + 1}`;

          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
          }
          monthlyData[monthYear] += booking.totalAmount ? parseFloat(booking.totalAmount) : 0;
        });

        const sortedMonths = Object.keys(monthlyData).sort((a, b) => a.localeCompare(b));
        const revenueData = sortedMonths.map(monthYear => {
          const [year, month] = monthYear.split('-').map(Number);
          const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
          return { month: monthName, revenue: monthlyData[monthYear] };
        });

        setMonthlyRevenue(revenueData);

        const vehicleSpecsMap = vehicleSpecsList.reduce((acc: any, spec: any) => {
          acc[spec.vehicleId] = spec;
          return acc;
        }, {});

        const highDepreciationList = fleetsList
          .filter((fleet: { depreciationRate: string; vehicleId: string; }) => {
            const rate = fleet.depreciationRate ? parseFloat(fleet.depreciationRate) : 0;
            return rate > 0.5;
          })
          .map((fleet: { depreciationRate: string; vehicleId: string; }) => {
            const spec = vehicleSpecsMap[fleet.vehicleId] || {};
            return {
              id: fleet.vehicleId,
              manufacturer: spec.manufacturer || 'N/A',
              model: spec.model || 'N/A',
              fuelType: spec.fuelType || 'N/A',
              engineCapacity: spec.engineCapacity || 'N/A',
              depreciationRate: parseFloat(fleet.depreciationRate),
            };
          });

        setHighDepreciationVehicles(highDepreciationList);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const revenueFormatted = typeof stats.revenue === 'number' ? stats.revenue.toFixed(2) : '0.00';
  const maintenanceFormatted = typeof stats.maintenance === 'number' ? stats.maintenance.toFixed(2) : '0.00';

  const printReport = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2 { color: #333; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background-color: #f4f4f4; }
            </style>
          </head>
          <body>
            <h1>Admin Reports</h1>
            <div>
              <h2>Overall Statistics</h2>
              <p>People: ${stats.people}</p>
              <p>Bookings: ${stats.bookings}</p>
              <p>Revenue: $${revenueFormatted}</p>
              <p>Vehicles: ${stats.vehicles}</p>
              <p>Maintenance: $${maintenanceFormatted}</p>
            </div>
            <div>
              <h2>Monthly Revenue</h2>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  ${monthlyRevenue.map(entry => `
                    <tr>
                      <td>${entry.month}</td>
                      <td>$${entry.revenue.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div>
              <h2>High Depreciation Vehicles</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Fuel Type</th>
                    <th>Engine Capacity</th>
                    <th>Depreciation Rate</th>
                  </tr>
                </thead>
                <tbody>
                  ${highDepreciationVehicles.map(vehicle => `
                    <tr>
                      <td>${vehicle.id}</td>
                      <td>${vehicle.manufacturer}</td>
                      <td>${vehicle.model}</td>
                      <td>${vehicle.fuelType}</td>
                      <td>${vehicle.engineCapacity}</td>
                      <td>${vehicle.depreciationRate.toFixed(2)}%</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Admin Reports</h1>
      <button
        onClick={printReport}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
      >
        Print Report
      </button>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Overall Statistics</h2>
        <Stats />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {monthlyRevenue.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{entry.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${entry.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">High Depreciation Vehicles</h2>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fuel Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Engine Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Depreciation Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {highDepreciationVehicles.map((vehicle, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{vehicle.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.manufacturer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.model}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.fuelType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.engineCapacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{vehicle.depreciationRate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

