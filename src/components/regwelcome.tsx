import React from 'react';
import { FaCar, FaStar, FaHandHoldingHeart } from 'react-icons/fa'; // Import additional icons for the message

const RegistrationSideCard = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                World Class Cars
            </h2>
            <p className="text-center text-lg">
                <FaCar className="inline-block text-yellow-400" /> Welcome to EXOTravel! 🚗✨<br />
                <FaStar className="inline-block text-yellow-400" /> We’re thrilled to have you join our community. <br />
                <FaHandHoldingHeart className="inline-block text-yellow-400" /> Registering with us gives you access to a diverse selection of vehicles, perfect for any occasion—whether it’s a quick getaway or a long-term rental.
            </p>
        </div>
    );
};

export default RegistrationSideCard;
