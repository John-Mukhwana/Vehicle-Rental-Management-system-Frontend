
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'; // Import social media icons from react-icons
import RegistrationSideCard from './regwelcome';

const SocialMediaLinks = () => {
    return (
        <>
        <RegistrationSideCard/>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
                <p className="text-gray-600">For more information or any questions, feel free to reach out through our social media channels:</p>
            </div>
            <div className="flex justify-center space-x-4">
                {/* Facebook Icon */}
                <a
                    href="https://www.facebook.com/your-facebook-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaFacebook size={24} />
                </a>
                
                {/* Twitter Icon */}
                <a
                    href="https://twitter.com/your-twitter-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                >
                    <FaTwitter size={24} />
                </a>
                
                {/* WhatsApp Icon */}
                <a
                    href="https://wa.me/your-whatsapp-number"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                >
                    <FaWhatsapp size={24} />
                </a>
            </div>
        </div>
        </>
    );
};

export default SocialMediaLinks;
