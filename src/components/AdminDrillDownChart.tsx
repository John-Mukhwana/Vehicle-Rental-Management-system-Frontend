import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

// Register chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title);

const DrilldownChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the endpoints
        const bookingsEndpoint = 'http://localhost:8000/api/bookings';
        const fleetsEndpoint = 'http://localhost:8000/api/fleets';

        // Fetch token from localStorage
        const token = localStorage.getItem('authToken');

        // Make concurrent requests with authorization headers
        const [bookingsResponse, fleetsResponse] = await Promise.all([
          axios.get(bookingsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(fleetsEndpoint, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Extract data from responses
        const bookingsList = bookingsResponse.data;
        const fleetsList = fleetsResponse.data;

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

        // Set chart data
        setChartData({
          labels: ['Revenue', 'Maintenance Cost'],
          datasets: [{
            label: 'Comparison',
            data: [totalRevenue, totalMaintenance],
            backgroundColor: ['#36A2EB', '#FF6384'],
            borderColor: ['#36A2EB', '#FF6384'],
            borderWidth: 1, // Thinner border width
          }],
        });

        // Set chart options
        setChartOptions({
          plugins: {
            title: {
              display: true,
              text: 'Revenue vs Maintenance Cost',
              padding: {
                top: 10,
                bottom: 20
              },
              font: {
                size: 16,
                weight: 'bold',
              },
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const label = tooltipItem.label || '';
                  const value = tooltipItem.raw;
                  return `${label}: $${value.toFixed(2)}`;
                },
              },
            },
          },
          elements: {
            arc: {
              borderWidth: 1, // Thinner border width for the ring
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%', // Reduced cutout for a more balanced ring
        });

      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl h-80 flex items-center justify-center">
      <div className="w-full h-full">
        {chartData && (
          <Doughnut data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default DrilldownChart;
