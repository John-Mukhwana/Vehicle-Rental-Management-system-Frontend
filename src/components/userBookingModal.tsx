


import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  vehicleId: number;
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ vehicleId, isOpen, onClose }) => {
  const [bookingDate, setBookingDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [rentalRate, setRentalRate] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      const fetchVehicleData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch vehicle data');
          }
          const vehicleData = await response.json();
          setRentalRate(Number(vehicleData.rentalRate)); // Convert rentalRate to number
        } catch (error) {
          console.error('Error fetching vehicle data:', error);
        }
      };

      fetchVehicleData();
    }
  }, [vehicleId, isOpen]);

  useEffect(() => {
    if (bookingDate && returnDate && rentalRate) {
      const days = Math.ceil((new Date(returnDate).getTime() - new Date(bookingDate).getTime()) / (1000 * 60 * 60 * 24));
      const amount = days * rentalRate;
      setTotalAmount(amount);
    }
  }, [bookingDate, returnDate, rentalRate]);

  const handleBook = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount, // Amount in cents
          currency: 'usd',
          bookingId: vehicleId, // Ensure bookingId is a number
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Book Vehicle</h2>
        <label className="block mb-2">
          Booking Date:
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Return Date:
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded-md"
          />
        </label>
        <p className="mt-2 text-lg">Rental Rate: ${rentalRate.toFixed(2)}</p>
        <p className="mt-2 text-lg">Total Amount: ${totalAmount.toFixed(2)}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleBook}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Book
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
