

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify'; // For displaying toast notifications

const SettingsCard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Notify user of successful logout
    toast.success('Successfully logged out from your account');
    
    // Redirect to login page
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <div className="relative w-64 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Settings</h2>
        <button onClick={toggleMenu} className="focus:outline-none">
          <FaCog className="text-gray-600" />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <Link to="AdminProfile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FaUser className="mr-2 text-gray-500" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaSignOutAlt className="mr-2 text-gray-500" />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsCard;
