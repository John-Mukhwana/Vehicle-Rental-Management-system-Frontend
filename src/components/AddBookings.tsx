

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useTheme } from 'next-themes'; // Assuming you are using Next.js

interface AddBookingFormProps {
  onAdd: (booking: Booking) => void;
}

interface Booking {
  bookingId?: number; // Optional
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled'; // Enum values
  createdAt?: string;
  updatedAt?: string;
}

const AddBookingForm: React.FC<AddBookingFormProps> = ({ onAdd }) => {
  const [newBooking, setNewBooking] = useState<Booking>({
    userId: 0,
    vehicleId: 0,
    locationId: 0,
    bookingDate: '',
    returnDate: '',
    totalAmount: '',
    bookingStatus: 'Pending', // default status
  });

  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Get the current theme (light or dark)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert values to number for specific fields
    if (name === 'userId' || name === 'vehicleId' || name === 'locationId') {
      setNewBooking(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setNewBooking(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    // Convert dates to ISO strings
    const updatedBooking = {
      ...newBooking,
      bookingDate: new Date(newBooking.bookingDate).toISOString(),
      returnDate: new Date(newBooking.returnDate).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post<Booking>(
        'http://localhost:8000/api/bookings',
        updatedBooking,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      onAdd(response.data); // Call the onAdd function with the new booking

      // Show success message using Sonner
      toast.success('Booking added successfully!');
      
      setNewBooking({
        userId: 0,
        vehicleId: 0,
        locationId: 0,
        bookingDate: '',
        returnDate: '',
        totalAmount: '',
        bookingStatus: 'Pending', // reset to default status
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        setError(`Error adding booking: ${error.response?.data?.message || error.message}`);

        // Show error message using Sonner
        toast.error(`Error adding booking: ${error.response?.data?.message || error.message}`);
      } else {
        const errorMessage = 'Error adding booking: ' + (error as Error).message;
        setError(errorMessage);

        // Show error message using Sonner
        toast.error(errorMessage);
      }
    }
  };

  const cardStyles = `
    p-6 rounded-lg shadow-lg ${
      theme === 'dark'
        ? 'bg-gray-800 text-white shadow-white'
        : 'bg-white text-gray-900 shadow-black'
    }`;

  return (
    <div className={cardStyles}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Add Booking</h3>
        {error && <p className="text-red-500">{error}</p>}
        <label className="block">
          User ID:
          <input
            type="number"
            name="userId"
            value={newBooking.userId || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full bg-gray-100"
            required
          />
        </label>
        <label className="block">
          Vehicle ID:
          <input
            type="number"
            name="vehicleId"
            value={newBooking.vehicleId || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <label className="block">
          Location ID:
          <input
            type="number"
            name="locationId"
            value={newBooking.locationId || ''}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <label className="block">
          Booking Date:
          <input
            type="datetime-local"
            name="bookingDate"
            value={newBooking.bookingDate}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <label className="block">
          Return Date:
          <input
            type="datetime-local"
            name="returnDate"
            value={newBooking.returnDate}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <label className="block">
          Total Amount:
          <input
            type="text"
            name="totalAmount"
            value={newBooking.totalAmount}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <label className="block">
          Booking Status:
          <input
            type="text"
            name="bookingStatus"
            value={newBooking.bookingStatus}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default AddBookingForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useTheme } from 'next-themes'; // Assuming you are using Next.js

// interface AddBookingFormProps {
//   onAdd: (booking: Booking) => void;
// }

// interface Booking {
//   bookingId?: number; // Optional
//   userId: number;
//   vehicleId: number;
//   locationId: number;
//   bookingDate: string;
//   returnDate: string;
//   totalAmount: string;
//   bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled'; // Enum values
//   createdAt?: string;
//   updatedAt?: string;
// }

// const AddBookingForm: React.FC<AddBookingFormProps> = ({ onAdd }) => {
//   const [newBooking, setNewBooking] = useState<Booking>({
//     userId: 0,
//     vehicleId: 0,
//     locationId: 0,
//     bookingDate: '',
//     returnDate: '',
//     totalAmount: '',
//     bookingStatus: 'Pending', // default status
//   });

//   const [error, setError] = useState<string | null>(null);
//   const { theme } = useTheme(); // Get the current theme (light or dark)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // Convert values to number for specific fields
//     if (name === 'userId' || name === 'vehicleId' || name === 'locationId') {
//       setNewBooking(prev => ({ ...prev, [name]: Number(value) }));
//     } else {
//       setNewBooking(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError(null);

//     // Convert dates to ISO strings
//     const updatedBooking = {
//       ...newBooking,
//       bookingDate: new Date(newBooking.bookingDate).toISOString(),
//       returnDate: new Date(newBooking.returnDate).toISOString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       const response = await axios.post<Booking>(
//         'http://localhost:8000/api/bookings',
//         updatedBooking,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       onAdd(response.data); // Call the onAdd function with the new booking

//       // Show success message using Sonner
//       toast.success('Booking added successfully!');
      
//       setNewBooking({
//         userId: 0,
//         vehicleId: 0,
//         locationId: 0,
//         bookingDate: '',
//         returnDate: '',
//         totalAmount: '',
//         bookingStatus: 'Pending', // reset to default status
//       });
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Error response:', error.response?.data);
//         setError(`Error adding booking: ${error.response?.data?.message || error.message}`);

//         // Show error message using Sonner
//         toast.error(`Error adding booking: ${error.response?.data?.message || error.message}`);
//       } else {
//         const errorMessage = 'Error adding booking: ' + (error as Error).message;
//         setError(errorMessage);

//         // Show error message using Sonner
//         toast.error(errorMessage);
//       }
//     }
//   };

//   const cardStyles = `
//     max-w-md mx-auto p-6 rounded-lg shadow-lg ${
//       theme === 'dark'
//         ? 'bg-gray-900 text-white shadow-gray-500'
//         : 'bg-white text-gray-900 shadow-gray-700'
//     }`;

//   return (
//     <div className={cardStyles}>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <h3 className="text-xl font-bold mb-4 text-center">Add Booking</h3>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">User ID:</span>
//           <input
//             type="number"
//             name="userId"
//             value={newBooking.userId || ''}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Vehicle ID:</span>
//           <input
//             type="number"
//             name="vehicleId"
//             value={newBooking.vehicleId || ''}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Location ID:</span>
//           <input
//             type="number"
//             name="locationId"
//             value={newBooking.locationId || ''}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Booking Date:</span>
//           <input
//             type="datetime-local"
//             name="bookingDate"
//             value={newBooking.bookingDate}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Return Date:</span>
//           <input
//             type="datetime-local"
//             name="returnDate"
//             value={newBooking.returnDate}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Total Amount:</span>
//           <input
//             type="text"
//             name="totalAmount"
//             value={newBooking.totalAmount}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <label className="block mb-3">
//           <span className="block text-sm font-medium mb-1">Booking Status:</span>
//           <input
//             type="text"
//             name="bookingStatus"
//             value={newBooking.bookingStatus}
//             onChange={handleChange}
//             className="border rounded p-2 w-full text-gray-800"
//             required
//           />
//         </label>
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
//           Add Booking
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBookingForm;
