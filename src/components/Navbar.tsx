import DarkMode from '../components/DarkMode';

const navbar = () => {
      
    return (
        <div className="">
        {/* Navbar */}
        <nav className=" bg-blue-800  dark:bg-gray-700 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-3xl font-bold flex items-center ">
              <span className="text-yellow-400 ">EXO</span><span className="text-white">Travel</span>
            </div>
            <div>
              <DarkMode />
            </div>
            </div>
        </nav>
        </div>   

    )

}
export default navbar;