


import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MdSpaceDashboard,  MdFlight, MdLocationOn} from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { TbBrandBooking,TbReportSearch } from "react-icons/tb";
import { FaCarSide,FaTicketAlt } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import SettingsCard from '../components/adminSettingsCard';
import axios from 'axios';

const AdminDashboard = () => {
   const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Admin');

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
     
    <Navbar/>
    <div className="flex   h-screen bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <aside className=" top-10 mf-5 z-40 w-74 h-full bg-green-600 dark:bg-gray-900 shadow-2xl p-4">
        <div className="flex flex-col h-full">
        <div className='flex justify-center bg-black  dark:bg-white w-full h-10 items-center'  >
          <h2 className="text-2xl  font-semibold text-white items-center  dark:text-black ">Admin Panel</h2>
          </div>
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
                <Link to="AdminHome" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500 ">
                  <MdSpaceDashboard className='text-white text-2xl font-bold'/><span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="Users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <FaUsersLine className='text-white text-2xl  font-bold' /><span className="ms-3">Users</span>
                </Link>
              </li>
              <li>
                <Link to="bookings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <TbBrandBooking className='text-white text-2xl font-bold'/><span className="ms-3">Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="AdminVehicleTable" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <FaCarSide className='text-white text-2xl font-bold' /><span className="ms-3">Vehicles</span>
                </Link>
              </li>
              <li>
                <Link to="LocationAndBranches" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <MdLocationOn className='text-white text-2xl font-bold '  /><span className="ms-3">Location and Branches</span>
                </Link>
              </li>
              <li>
                <Link to="ticketsPage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <FaTicketAlt  className='text-white text-2xl font-bold '/> <span className="ms-3">Customer Support Tickest</span>
                </Link>
              </li>
              <li>
                <Link to="FleetsPage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <MdFlight className='text-white text-2xl font-bold ' /> <span className="ms-3">Fleet Management</span>
                </Link>
              </li>
              <li>
                <Link to="Reports" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white  hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500">
                <TbReportSearch className='text-white text-2xl font-bold' /> <span className="ms-3">Reports</span>
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="pt-32">
           <SettingsCard/>
        </div>
        
        </div>

      </aside>

      {/* Main content */}
      <div className="flex-1 ml-3 p-6 overflow-y-auto bg-gray-400 dark:bg-gray-800">
          <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default AdminDashboard;
