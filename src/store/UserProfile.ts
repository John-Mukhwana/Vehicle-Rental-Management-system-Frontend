import { useEffect, useState } from 'react';
import axios from 'axios';

// Define your Cloudinary URL and upload preset
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dbczn8b8l/image/upload'; // Replace with your Cloudinary URL
const UPLOAD_PRESET = 'UserProfile'; // Replace with your Cloudinary upload preset

export const useAdminAside = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [FullName, setUserName] = useState<string>('User Name');

  // Fetch user data and profile picture from local storage or API
  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('profilePicture');
    const storedUserName = localStorage.getItem('FullName');
    const userId = localStorage.getItem('userId');

    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    } else if (userId) {
      // Replace with your API endpoint to fetch user data
      fetch(`http://localhost:8000/api/users`)
      
        .then(response => response.json())

         
        .then(data => {
          console.log('API Response Data:', data);
          
          setUserName(data.full_name);
          localStorage.setItem('userName', data.full_name);
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, []);

  // Handle file upload to Cloudinary
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        const imageUrl = response.data.secure_url;
        setProfilePicture(imageUrl);
        localStorage.setItem('profilePicture', imageUrl);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  return { profilePicture, FullName, handleProfilePictureChange };
};
