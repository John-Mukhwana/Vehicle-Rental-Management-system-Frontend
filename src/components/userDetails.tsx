
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';
import Navbar from './Navbar';

type FormData = {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
};

const UserDetailsForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // Ensure userId is a number
      const payload = {
        ...data,
        userId: Number(data.userId),
      };

      console.log('Submitting data:', payload);

      // Post data to backend using axios
      const response = await axios.post('https://exotravel-vehicle-rental-management.onrender.com/api/users', payload);

      // Handle successful response
      if (response.status === 201) {
        // Navigate to the registration form
        navigate('/RegistrationForm');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error submitting form:', error.response.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <>
    <Navbar toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
  <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800 dark:text-gray-200">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
        <span className="text-golden-500">EXO</span>Travel
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Please fill out the details below to proceed.</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
        <input
          id="userId"
          type="number"
          {...register('userId', { required: 'User ID is required', valueAsNumber: true })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
        {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
      </div>
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', { required: 'Full name is required' })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Phone</label>
        <input
          id="contactPhone"
          type="text"
          {...register('contactPhone', { required: 'Contact phone is required' })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
        {errors.contactPhone && <p className="text-red-500 text-sm">{errors.contactPhone.message}</p>}
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
        <input
          id="address"
          type="text"
          {...register('address', { required: 'Address is required' })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </div>
</div>

    <Footer />
    </>
  );
};

export default UserDetailsForm;
