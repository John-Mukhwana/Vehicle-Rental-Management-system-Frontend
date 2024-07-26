

import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import UserSettingsCard from '../components/userSettingsCard';
import { MdContactMail, MdDirectionsCar, MdHistory, MdSpaceDashboard } from 'react-icons/md';
import { TbBrandBooking } from 'react-icons/tb';
import { FaRegCreditCard } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('UserName');

  const getUserId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).user.userId : null;
  };

  const fetchProfileData = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        const token = localStorage.getItem('authToken'); // Fetch token
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setProfilePicture(response.data.profilePicture || '/path/to/placeholder.png');
        setUserName(response.data.fullName || 'Admin');
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Navbar toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-800">
        {/* Sidebar */}
        <aside className="top-10 mf-5 z-40 w-74 h-full bg-green-600 dark:bg-gray-900 shadow-2xl p-4">
      <div className="flex flex-col h-full">
        
        <div className="flex flex-col items-center mt-6">
          <img
            src={profilePicture || '/path/to/placeholder.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <p className="mt-2 text-2xl font-bold text-yellow-400 dark:text-white">{userName}</p>
        </div>
        <div className="flex-flow justify-center items-center">
          <ul className="space-y-3 pt-10 font-bold">
            <li>
              <Link
                to="userHome"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <MdSpaceDashboard className="text-white text-2xl font-bold" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="AvailableVehicles"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <MdDirectionsCar className="text-white text-2xl font-bold" />
                <span className="ms-3">Available Vehicles</span>
              </Link>
            </li>
            <li>
              <Link
                to="CurrentBookings"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <TbBrandBooking className="text-white text-2xl font-bold" />
                <span className="ms-3">Current Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="UserPayments"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <FaRegCreditCard className="text-white text-2xl font-bold" />
                <span className="ms-3">Payments</span>
              </Link>
            </li>
            <li>
              <Link
                to="BookingsHistory"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <MdHistory className="text-white text-2xl font-bold" />
                <span className="ms-3">Booking History</span>
              </Link>
            </li>
            <li>
              <Link
                to="ContactUs"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500"
              >
                <MdContactMail className="text-white text-2xl font-bold" />
                <span className="ms-3">Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-32">
          <UserSettingsCard />
        </div>
      </div>
    </aside>

        {/* Main content */}
        <div className="flex-1 ml-3 p-6 overflow-y-auto bg-blue-100 dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
          <Outlet /> {/* Renders the matched child route */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
