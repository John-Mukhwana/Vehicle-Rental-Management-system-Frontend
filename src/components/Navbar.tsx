import DarkMode from '../components/DarkMode';
import { MdMenu } from 'react-icons/md';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="">
      {/* Navbar */}
      <nav className="bg-blue-800 dark:bg-gray-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Toggle Button */}
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <MdMenu className="text-2xl" />
          </button>
          {/* Logo */}
          <div className="text-3xl font-bold flex items-center ">
            <span className="text-yellow-400">EXO</span><span className="text-white">Travel</span>
          </div>
          <div>
            <DarkMode />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
