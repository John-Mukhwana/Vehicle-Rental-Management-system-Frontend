


import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MdSpaceDashboard, MdFlight, MdLocationOn, MdMenu, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbBrandBooking, TbReportSearch } from "react-icons/tb";
import { FaCarSide, FaTicketAlt } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import SettingsCard from '../components/adminSettingsCard';
import axios from 'axios';

const AdminDashboard = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Admin');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const getUserId = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).user.userId : null;
  };

  const fetchProfileData = async () => {
    const userId = getUserId();
    if (userId) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://exotravel-vehicle-rental-management.onrender.com/api/users/${userId}`, {
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

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-col h-screen md:flex-row">
        {/* Sidebar */}
        <aside className={`fixed z-40 h-full bg-green-600 dark:bg-gray-900 shadow-2xl transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
          <div className="flex flex-col h-full overflow-y-auto">
            <div className='flex justify-between items-center bg-black dark:bg-white w-full h-10 px-4'>
              <h2 className="text-2xl font-semibold text-white dark:text-black">Admin Panel</h2>
              <button className="md:hidden text-white dark:text-black" onClick={toggleSidebar}>
                <MdMenu className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col items-center mt-6">
              <img
                src={profilePicture || '/path/to/placeholder.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              <p className="mt-2 text-2xl font-bold text-yellow-400 dark:text-white">{userName}</p>
            </div>
            <div className="flex-grow overflow-y-auto">
              <ul className="space-y-3 pt-10 font-bold w-full">
                <li>
                  <Link to="AdminHome" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <MdSpaceDashboard className='text-white text-2xl font-bold' /><span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="Users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <FaUsers className='text-white text-2xl font-bold' /><span className="ml-3">Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="bookings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <TbBrandBooking className='text-white text-2xl font-bold' /><span className="ml-3">Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="AdminVehicleTable" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <FaCarSide className='text-white text-2xl font-bold' /><span className="ml-3">Vehicles</span>
                  </Link>
                </li>
                <li>
                  <Link to="LocationAndBranches" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <MdLocationOn className='text-white text-2xl font-bold' /><span className="ml-3">Location and Branches</span>
                  </Link>
                </li>
                <li>
                  <Link to="ticketsPage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <FaTicketAlt className='text-white text-2xl font-bold' /><span className="ml-3">Customer Support Tickets</span>
                  </Link>
                </li>
                <li>
                  <Link to="FleetsPage" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <MdFlight className='text-white text-2xl font-bold' /><span className="ml-3">Fleet Management</span>
                  </Link>
                </li>
                <li>
                  <Link to="Reports" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500" onClick={handleLinkClick}>
                    <TbReportSearch className='text-white text-2xl font-bold' /><span className="ml-3">Reports</span>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-900 hover:text-white dark:hover:text-yellow-500 cursor-pointer" onClick={toggleSettings}>
                    <MdSettings className='text-white text-2xl font-bold' /><span className="ml-3">Settings</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64">
          <div className="flex-1 p-6 overflow-y-auto bg-gray-400 dark:bg-gray-800">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-80">
            <SettingsCard />
            <button className="mt-4 w-full text-center text-white bg-red-500 p-2 rounded-lg" onClick={toggleSettings}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
