
import  { useState } from 'react';
import {  FaDollarSign, FaCalendarCheck, FaShieldAlt, FaTruck, FaHeadset, FaCalendar, FaUsers, FaSuitcaseRolling, FaTag } from 'react-icons/fa'; // Import icons for services
import { Link } from 'react-router-dom';
import ContactUs from '../components/contactUs';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
  };
  return (
    <div className="bg-green-200 min-h-screen flex flex-col bg-[url('https://res.cloudinary.com/dbczn8b8l/image/upload/v1721597676/kovdndaff5stop2i44zq.jpg')] bg-cover  w-full  bg-center bg-no-repeat">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-bold flex items-center ">
            <span className="text-yellow-400 ">EXO</span><span className="text-white">Travel</span>
          </div>

          {/* Navbar Links for Large Screens */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#services" className="hover:underline">Our Services</a>
            <a href="#fleet" className="hover:underline">Our Fleet</a>
            <Link to="/createAccount" className="bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-400">Create Acount</Link>
            <Link to="/Login" className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-400">Login</Link>
          </div>

          {/* Hamburger Icon for Small Screens */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white text-2xl">
              <i className="fas fa-bars"></i> {/* FontAwesome icon replaced with DaisyUI */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-blue-800 text-white flex flex-col items-center pt-16 space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-2xl text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <a href="" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" className="hover:underline" onClick={() => setIsMenuOpen(false)}>About Us</a>
          <a href="#services" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Our Services</a>
          <a href="#fleet" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Our Fleet</a>
          <a href="" className="bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-400" onClick={() => setIsMenuOpen(false)}>Register</a>
          <a href="/Login" className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-400" onClick={() => setIsMenuOpen(false)}>Login</a>
        </div>
      </nav>
      
 {/* Hero Section */}
 <header className="py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 w-full h-400 bg-[url('https://res.cloudinary.com/dbczn8b8l/image/upload/v1721591218/pe5pwr4vck9p4m3jhenr.jpg')] bg-cover bg-no-repeat ">
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Welcome to <span className="text-yellow-400">EXO</span><span className="text-white-400">Travel</span>
            </h1>
            <p className=" mb-8 text-green-400 text-2xl">
              Explore the world with our travel services. We offer the best travel experiences tailored just for you.
            </p>
            <Link to="createAccount" className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400">Get Started</Link>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1721726958/dwibkfpgkscrw2h9zheq.png" alt="Car" className="w-full h-auto max-w-lg" />
          </div>
        </div>
      </header>

        {/* About Us Section */}
        <section id="about" className="py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          {/* Logo and Car Image */}
          <div className="flex items-center mb-8 md:mb-0 md:w-1/2">
            <div className="flex items-center">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1721061382/uegmw9yy885xb0ohnldx.png" alt="Car" className="h-50 w-full "/>
            </div>
          </div>

          {/* About Us Text */}
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-green-600">About Us</h2>
            <p className="text-xl text-gray ">
              At <span className="text-yellow-400 text-2xl font-bold">EXO</span><span className="text-white-400 text-3xl font-bold text-white">Travel</span>, we strive to provide exceptional travel experiences tailored to your needs. Our dedicated team is committed to offering top-notch services to make your journey memorable. Whether you're planning a vacation, a business trip, or a special event, we've got you covered with our extensive range of travel solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <div id="services" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaDollarSign className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p>Competitive prices that fit your budget.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaCalendarCheck className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Online Booking</h3>
              <p>Book your car easily through our online platform.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaShieldAlt className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety Guaranteed</h3>
              <p>High standards of safety and vehicle maintenance.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaTruck className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Package Delivery</h3>
              <p>Efficient package delivery options available.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaHeadset className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
              <p>Round-the-clock support for any queries or issues.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaCalendar className="text-yellow-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Long-Term Rentals</h3>
              <p>Flexible long-term rental options to meet your travel needs.</p>
            </div>
          </div>
        </div>
      </div>

        {/* Our Fleet Section */}
      <section id="fleet" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fleet Card */}
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1721596579/vq2t9lmzfbyh6v6kadbn.jpg" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Toyota Camry</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2022</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" />Max Bags: 3</p>
              <p className='text-blue-500 font-bold' ><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 5</p>
            </div>
            {/* Add more fleet cards as needed */}
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1721598162/uyvtgmd0crqotqahtyzw.webp" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ford Expedition</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2021</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" /> Max Bags:4</p>
              <p className='text-blue-500 font-bold'><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 7</p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1721596772/n1voplfbvegbk7twfo5i.jpg" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">AUDI RS6</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2020</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" />Max Bags: 4</p>
              <p className='text-blue-500 font-bold'><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 6</p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1721674619/vbr3scx9iqbuo3jpgbpt.jpg" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chevrolet Tahoe</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2020</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" />Max Bags: 4</p>
              <p className='text-blue-500 font-bold'><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 6</p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/t_Mercedes GLE cropped/v1721596537/egvwubtgpjjked0dlarq.jpg" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mercedes GLE</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2020</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" />Max Bags: 4</p>
              <p className='text-blue-500 font-bold'><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 6</p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img src="https://res.cloudinary.com/dbczn8b8l/image/upload/v1721596413/yfulaqkgr8b02t0unywu.jpg" alt="Vehicle" className="w-full rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ford Expedition</h3>
              <p className='text-blue-500 font-bold'><FaTag className="inline-block mr-2 text-yellow-700" />Model: 2020</p>
              <p className='text-blue-500 font-bold'><FaSuitcaseRolling className="inline-block mr-2 text-yellow-700" />Max Bags: 4</p>
              <p className='text-blue-500 font-bold'><FaUsers className="inline-block mr-2 text-yellow-700" />Max Passengers: 6</p>
            </div>
          </div>
        </div>
      </section>
       
        {/* Contact Us Section */}
      <section  >
       <ContactUs/>  
    </section>

         {/* Footer */}
      <footer className="bg-blue-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 <span className="text-yellow-400 font-bold">EXO</span><span className="text-white">Travel</span>. All rights reserved.</p>
        </div>
      </footer>  
     </div>

    
  );
};

export default Home;

