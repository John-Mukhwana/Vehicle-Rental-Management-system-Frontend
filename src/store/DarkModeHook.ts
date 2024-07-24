import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or default to false
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the mode to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
