import React from 'react';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';


const ContactUs: React.FC = () => {
  return (
    <div>
      {/* Contact Us Section */}
      <section id="contact" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-between">
            {/* Contact Information */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl mr-4" />
                <p className="text-white">123 Express Wau, Nairobi, Kenya</p>
              </div>
              <div className="flex items-center mb-6">
                <FaPhoneAlt className="text-yellow-500 text-2xl mr-4" />
                <p className="text-white">+245 </p>
              </div>
              <div className="flex items-center mb-6">
                <FaEnvelope className="text-yellow-500 text-2xl mr-4" />
                <p className="text-white">info@exotravel.com</p>
              </div>
              <div className="flex items-center mb-6">
                <FaClock className="text-yellow-500 text-2xl mr-4" />
                <p className="text-white">Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2">
              <form action="#" method="POST" className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
