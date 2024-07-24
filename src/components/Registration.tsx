

// export default RegistrationForm;
import { Link } from "react-router-dom";
import SocialMediaLinks from "./socialmedia";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const RegistrationForm = () => {
    // State to manage form input values
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccess('');

        try {
            // Make POST request to the backend API
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                userId: parseInt(userId), // Ensure userId is an integer
                fullName: fullName.trim(),
                email: email.trim(),
                password: password.trim(),
            });

            // Handle successful registration
            toast.success('Registration successful! Please log in.', {
                    style: {
                        backgroundColor: '#28a745', // Green background for success
                        color: '#fff', // White text color
                    },
                    position: 'top-center',
                    duration: 5000,
                });
            setSuccess('Registration successful! Please log in.');
        } catch (err) {
            if ((err as any).response?.status === 400) {
                // Handle specific case where user is already registered
                toast.error('User is already registered. Please use a different ID or email.',
                 { style: {
                        backgroundColor: '#dc3545', // Red background for error
                        color: '#fff', // White text color
                    },
                    position: 'top-center',
                    duration: 5000,
                }
                );
            } else {
                // Handle general errors
                toast.error('Registration failed. Please try again.');
            }
            // Handle error during registration
            console.error(err); // Log error for debugging
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-green-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden flex">
                {/* Left Side with Background Image and Dark Overlay */}
                <div className="w-1/2 bg-cover bg-center bg-[url('https://res.cloudinary.com/dbczn8b8l/image/upload/v1721125467/vos7liixf7b5z8crfswy.jpg')]">
                    <div className="grid gap-2 items-center justify-center h-full bg-black bg-opacity-60">
                        <div className="text-3xl font-bold flex items-center justify-center pt-4">
                            <span className="text-yellow-400">EXO</span><span className="text-white">Travel</span>
                        </div>
                        <div className="text-center text-white p-8">
                            <SocialMediaLinks />
                        </div>
                    </div>
                </div>

                {/* Right Side with Registration Form */}
                <div className="w-1/2 bg-black text-white p-8 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="mb-4">
                            <label htmlFor="userId" className="block">User ID</label>
                            <input
                                type="number"
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                                placeholder="Enter your User ID"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                                placeholder="Enter your Full Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                                placeholder="Enter your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
                                placeholder="Enter your Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            Register
                        </button>
                        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </form>
                    <div className="mt-4 text-center">
                        <p>Already have an account? <Link to="/UserLogin" className="text-green-400 hover:underline ">LOGIN</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
