
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './loading'; // Make sure to import the Loading component

interface VehicleSpecification {
  vehicleId: number;
  manufacturer: string;
  model: string;
  engineCapacity: string;
}

interface Booking {
  bookingId: number;
  vehicleId: number;
  userId: number;
  totalAmount: string;
  bookingStatus: string;
  bookingDate: string;
  returnDate: string;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicleSpecs, setVehicleSpecs] = useState<{ [key: number]: VehicleSpecification }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Retrieve and parse user data from local storage
  const userData = localStorage.getItem('user');
  const token = localStorage.getItem('authToken');
  
  // Parse user data if available
  const userId = userData ? JSON.parse(userData).user.userId : null;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) {
          setError('User not authenticated');
          return;
        }

        const response = await axios.get<Booking[]>('http://localhost:8000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          const userBookings = response.data.filter(
            (booking: Booking) => booking.userId === userId
          );
          setBookings(userBookings);
        } else {
          console.error('Data is not an array:', response.data);
          setError('Data format error');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicleSpecifications = async () => {
      try {
        if (!token) {
          setError('User not authenticated');
          return;
        }

        const response = await axios.get<VehicleSpecification[]>('http://localhost:8000/api/vehicleSpecifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          const specsMap = response.data.reduce((acc: { [key: number]: VehicleSpecification }, spec: VehicleSpecification) => {
            acc[spec.vehicleId] = spec;
            return acc;
          }, {});
          setVehicleSpecs(specsMap);
        } else {
          console.error('Data is not an array:', response.data);
          setError('Data format error');
        }
      } catch (error) {
        console.error('Error fetching vehicle specifications:', error);
        setError('Failed to fetch vehicle specifications');
      }
    };

    fetchBookings();
    fetchVehicleSpecifications();
  }, [userId, token]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      case 'Confirmed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Booking History</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <Loading />
      ) : (
        bookings.length > 0 ? (
          bookings
            .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime())
            .map((booking) => (
              <div key={booking.bookingId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Booking ID: {booking.bookingId}</h3>
                  <span className={`py-1 px-3 rounded ${getStatusClass(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Vehicle ID:</p>
                    <p className="text-gray-800 dark:text-gray-200">{booking.vehicleId}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Total Amount:</p>
                    <p className="text-gray-800 dark:text-gray-200">${booking.totalAmount}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Booking Date:</p>
                    <p className="text-gray-800 dark:text-gray-200">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Return Date:</p>
                    <p className="text-gray-800 dark:text-gray-200">{booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Manufacturer:</p>
                    <p className="text-gray-800 dark:text-gray-200">{vehicleSpecs[booking.vehicleId]?.manufacturer || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Model:</p>
                    <p className="text-gray-800 dark:text-gray-200">{vehicleSpecs[booking.vehicleId]?.model || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-600 dark:text-gray-300">Engine Capacity:</p>
                    <p className="text-gray-800 dark:text-gray-200">{vehicleSpecs[booking.vehicleId]?.engineCapacity || 'N/A'}</p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">No booking history found</p>
        )
      )}
    </div>
  );
};

export default BookingHistory;
