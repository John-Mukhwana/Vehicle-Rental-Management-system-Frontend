

import React, { useState } from 'react';
import AddBooking from '../../components/AddBookings'; // Adjust the import path if needed
import { Booking } from '../../types/types'; // Adjust the import path if needed
import { Toaster } from 'sonner';
import ManageBookings from '../../components/BookingsTable';

const AdminBookings: React.FC = () => {
  const [, setBookings] = useState<Booking[]>([]); // State to hold the list of bookings

  // Function to handle the addition of a new booking
  const handleAddBooking = (newBooking: Booking) => {
    // Update the state with the new booking
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  return (
    <>
      <Toaster
        position="top-center" // Position notifications at the top center
        toastOptions={{
          duration: 5000, // Duration in milliseconds
        }}
      />
      <div className="p-6 space-y-8">
        <h2 className="text-2xl font-semibold mb-6">Admin Bookings</h2>
        {/* Pass the handleAddBooking function as a prop */}
        <AddBooking onAdd={handleAddBooking} />
        {/* Render the list of bookings or other components here */}
        <ManageBookings />
      </div>
    </>
  );
};

export default AdminBookings;
