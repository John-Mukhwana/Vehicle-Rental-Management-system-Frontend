// src/components/ManageBookings.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface Booking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled';
}

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { theme } = useTheme();

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<Booking[]>('https://exotravel-vehicle-rental-management.onrender.com/api/bookings');
        setBookings(response.data);
      } catch (error) {
        setError(`Error fetching bookings: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
        toast.error(`Error fetching bookings: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
      }
    };

    fetchBookings();
  }, []);

  // Handle booking edit
  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  // Handle booking delete
  const handleDelete = async (bookingId: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`https://exotravel-vehicle-rental-management.onrender.com/api/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
        toast.success('Booking deleted successfully!');
      } catch (error) {
        setError(`Error deleting booking: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
        toast.error(`Error deleting booking: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
      }
    }
  };

  // Handle booking update
  const handleUpdate = async (updatedBooking: Booking) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.put(`https://exotravel-vehicle-rental-management.onrender.com/api/bookings/${updatedBooking.bookingId}`, updatedBooking, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setBookings(bookings.map(booking => (booking.bookingId === updatedBooking.bookingId ? updatedBooking : booking)));
      setEditingBooking(null);
      toast.success('Booking updated successfully!');
    } catch (error) {
      setError(`Error updating booking: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
      toast.error(`Error updating booking: ${axios.isAxiosError(error) ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };



  const cardStyles = `
    w-full  p-8 rounded-lg shadow-lg ${
      theme === 'dark'
        ? 'bg-gray-900 text-white shadow-gray-500'
        : 'bg-white text-gray-900 shadow-gray-700'
    }`;

  const tableStyles = `
    w-full border border-gray-300 ${
      theme === 'dark'
        ? 'text-white'
        : 'text-gray-900'
    }`;

  return (
      <div className={cardStyles}>
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Bookings</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Vehicle ID</th>
              <th className="border px-4 py-2">Location ID</th>
              <th className="border px-4 py-2">Booking Date</th>
              <th className="border px-4 py-2">Return Date</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.bookingId}>
                <td className="border px-4 py-2">{booking.bookingId}</td>
                <td className="border px-4 py-2">{booking.userId}</td>
                <td className="border px-4 py-2">{booking.vehicleId}</td>
                <td className="border px-4 py-2">{booking.locationId}</td>
                <td className="border px-4 py-2">{new Date(booking.bookingDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(booking.returnDate).toLocaleString()}</td>
                <td className="border px-4 py-2">{booking.totalAmount}</td>
                <td className="border px-4 py-2">{booking.bookingStatus}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(booking)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking.bookingId)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingBooking && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Booking</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingBooking) {
                  handleUpdate(editingBooking);
                }
              }}
              className="space-y-4"
            >
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">User ID:</span>
                <input
                  type="number"
                  name="userId"
                  value={editingBooking.userId}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, userId: Number(e.target.value) } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Vehicle ID:</span>
                <input
                  type="number"
                  name="vehicleId"
                  value={editingBooking.vehicleId}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, vehicleId: Number(e.target.value) } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Location ID:</span>
                <input
                  type="number"
                  name="locationId"
                  value={editingBooking.locationId}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, locationId: Number(e.target.value) } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Booking Date:</span>
                <input
                  type="datetime-local"
                  name="bookingDate"
                  value={new Date(editingBooking.bookingDate).toISOString().slice(0, -1)}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, bookingDate: new Date(e.target.value).toISOString() } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Return Date:</span>
                <input
                  type="datetime-local"
                  name="returnDate"
                  value={new Date(editingBooking.returnDate).toISOString().slice(0, -1)}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, returnDate: new Date(e.target.value).toISOString() } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Total Amount:</span>
                <input
                  type="text"
                  name="totalAmount"
                  value={editingBooking.totalAmount}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, totalAmount: e.target.value } : null)}
                  className="border rounded p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-3">
                <span className="block text-sm font-medium mb-1">Status:</span>
                <select
                  name="bookingStatus"
                  value={editingBooking.bookingStatus}
                  onChange={(e) => setEditingBooking(prev => prev ? { ...prev, bookingStatus: e.target.value as 'Pending' | 'Confirmed' | 'Cancelled' } : null)}
                  className="border rounded p-2 w-full"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Booking'}
              </button>
            </form>
          </div>
        )}
      </div>
  );
};

export default ManageBookings;
