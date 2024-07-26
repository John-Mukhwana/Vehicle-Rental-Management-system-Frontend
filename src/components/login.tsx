
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Footer from './footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('Response data:', data);

        if (data.error === 'data and hash arguments required') {
          setError('Register to login.');
          toast.error('Register to login.');
        } else if (data.error === 'Invalid credentials') {
          setError('Invalid credentials. Try again.');
          toast.error('Invalid credentials. Try again.');
        } else {
          setError(data.message);
          toast.error(data.message);
        }
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      const token = data.token;
      const user = data.user;
      const role = data.user?.role;
      console.log('Role:', role);

      if (token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', token);
      }

      if (user) {
        // Store the user data in localStorage
        localStorage.setItem('user', JSON.stringify({ user }));
      }

      if (role === 'user') {
        navigate('/UserDashboard');
      } else if (role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        setError('Invalid role: ' + role);
        toast.error('Invalid role: ' + role);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12 bg-[url('https://res.cloudinary.com/dbczn8b8l/image/upload/v1721728880/boyufjl3tsa03ybtiw6a.webp')] bg-cover bg-no-repeat">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 dark:from-gray-800 dark:to-gray-100 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
            <form onSubmit={handleSubmit} className="grid max-w-md mx-auto">
              <div className="grid gap-4">
                <div className="text-3xl font-bold flex items-center">
                  <span className="text-yellow-400">EXO</span><span className="text-black dark:text-white">Travel</span>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold dark:text-white">Login</h1>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:border-rose-600 dark:focus:border-rose-400"
                      placeholder="Email address"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-900 focus:outline-none focus:border-rose-600 dark:focus:border-rose-400"
                      placeholder="Password"
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button className="bg-cyan-500 dark:bg-cyan-700 text-white rounded-md px-2 py-1 hover:bg-cyan-600 dark:hover:bg-white dark:text-black">
                      Submit
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </div>
              <div className="mt-1 text-center">
                <p className='text-black dark:text-white'>Don't have an account? <Link to="/createAccount" className="text-green-900 hover:underline dark:text-yellow-400">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Login;
