

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TooltipItem } from 'chart.js/auto';
import axios from 'axios';

// Register Chart.js components
Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const MonthlyRevenueChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Total Amount',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = 'http://localhost:8000/api/bookings';
        const token = localStorage.getItem('authToken'); // Fetch token from localStorage

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookings = response.data;

        const monthlyData: { [key: string]: number } = {};

        bookings.forEach((booking: { bookingDate: string | number | Date; totalAmount: string; }) => {
          const date = new Date(booking.bookingDate);
          const month = date.getMonth();
          const year = date.getFullYear();
          const monthYear = `${year}-${month + 1}`; // Format as YYYY-MM for sorting

          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
          }
          monthlyData[monthYear] += booking.totalAmount ? parseFloat(booking.totalAmount) : 0;
        });

        const sortedMonths = Object.keys(monthlyData).sort((a, b) => a.localeCompare(b));
        const labels = sortedMonths.map(monthYear => {
          const [year, month] = monthYear.split('-').map(Number);
          return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
        });
        const data = sortedMonths.map(monthYear => monthlyData[monthYear]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Amount',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-300 rounded-lg shadow-md max-w-4xl ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-950">Monthly Revenue</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: TooltipItem<'bar'>) {
                  let label = tooltipItem.dataset.label || '';
                  return `${label}: $${tooltipItem.formattedValue}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
                color: 'black',
                font: { weight: 'bold', size: 14 },
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 12,
                color: 'green',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Total Amount ($)',
                color: 'black',
                font: { weight: 'bold', size: 14},
              },
              beginAtZero: true,
              ticks: {
                
                color: 'red',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default MonthlyRevenueChart;
