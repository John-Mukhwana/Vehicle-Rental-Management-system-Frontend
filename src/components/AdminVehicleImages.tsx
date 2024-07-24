// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loading from './loading';

// interface Vehicle {
//   vehicleId: number;
//   specifications: {
//     manufacturer: string;
//     model: string;
//     year: number;
//     fuelType: string;
//     transmission: string;
//     color: string;
//     seatingCapacity: number;
//     features: string;
//   };
//   fleetManagement: {
//     status: string;
//   };
//   vehicleImage: string; // URL of the vehicle image
// }

// const VehicleManagement: React.FC = () => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>([]);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/vehicles', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });
//       setVehicles(response.data);
//     } catch (error) {
//       console.error('Error fetching vehicles:', error);
//       toast.error('Error fetching vehicles');
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, vehicleId: number) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//       setSelectedVehicleId(vehicleId);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!imageFile || selectedVehicleId === null) {
//       toast.error('No image file selected or no vehicle selected.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Upload image to Cloudinary
//       const formData = new FormData();
//       formData.append('file', imageFile);
//       formData.append('upload_preset', 'UserProfile'); // Use your upload preset here

//       const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dbczn8b8l/image/upload', formData);
//       const imageUrl = cloudinaryResponse.data.secure_url;
//       // Update the vehicleImage URL in the backend
//       const updateUrl = `http://localhost:8000/api/vehicles/${selectedVehicleId}`;
//       const updateResponse = await axios.put(updateUrl, { vehicleImage: imageUrl }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       console.log('Update response:', updateResponse.status, updateResponse.data);

//       if (updateResponse.status === 200 || updateResponse.status === 201) {
//         // Update the vehicle list state with the new image URL
//         setVehicles(prevVehicles =>
//           prevVehicles.map(vehicle =>
//             vehicle.vehicleId === selectedVehicleId
//               ? { ...vehicle, vehicleImage: imageUrl }
//               : vehicle
//           )
//         );
//         toast.success('Vehicle image updated successfully!');
//       } else {
//         throw new Error(`Unexpected response status: ${updateResponse.status}`);
//       }

//       setImageFile(null);
//       setSelectedVehicleId(null);
//     } catch (error) {
//       console.error('Error uploading image or updating vehicle:', error);

//       // Provide more detailed feedback for different types of errors
//       if (axios.isAxiosError(error)) {
//         toast.error(`Error: ${error.response?.data?.message || 'Failed to update vehicle image'}`);
//       } else {
//         toast.error('Error updating vehicle image. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Vehicles</h1>

//       {loading && <Loading />}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {vehicles.map(vehicle => (
//           <div key={vehicle.vehicleId} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
//             <div className="relative mb-4">
//               {vehicle.vehicleImage ? (
//                 <img
//                   src={vehicle.vehicleImage}
//                   alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`}
//                   className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-700"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//                   <p className="text-gray-600 dark:text-gray-400">No Image</p>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageChange(e, vehicle.vehicleId)}
//                 className="absolute top-2 right-2"
//               />
//             </div>
//             <h2 className="text-xl font-semibold">{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
//             <p className="text-gray-600 dark:text-gray-300">Year: {vehicle.specifications.year}</p>
//             <p className="text-gray-600 dark:text-gray-300">Fuel Type: {vehicle.specifications.fuelType}</p>
//             <p className="text-gray-600 dark:text-gray-300">Transmission: {vehicle.specifications.transmission}</p>
//             <p className="text-gray-600 dark:text-gray-300">Color: {vehicle.specifications.color}</p>
//             <p className="text-gray-600 dark:text-gray-300">Seating Capacity: {vehicle.specifications.seatingCapacity}</p>
//             <p className="text-gray-600 dark:text-gray-300">Features: {vehicle.specifications.features}</p>
//             <p className="text-gray-600 dark:text-gray-300">Status: {vehicle.fleetManagement.status}</p>
//           </div>
//         ))}
//       </div>

//       {imageFile && selectedVehicleId !== null && (
//         <div className="mt-6 flex justify-end">
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={handleImageUpload}
//           >
//             Upload Image
//           </button>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default VehicleManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';

interface Vehicle {
  vehicleId: number;
  specifications: {
    manufacturer: string;
    model: string;
    year: number;
    fuelType: string;
    transmission: string;
    color: string;
    seatingCapacity: number;
    features: string;
  };
  fleetManagement: {
    status: string;
  };
  vehicleImage: string; // URL of the vehicle image
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vehicles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Error fetching vehicles');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, vehicleId: number) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setSelectedVehicleId(vehicleId);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile || selectedVehicleId === null) {
      toast.error('No image file selected or no vehicle selected.');
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'UserProfile'); // Use your upload preset here

      const cloudinaryResponse = await axios.post('https://api.cloudinary.com/v1_1/dbczn8b8l/image/upload', formData);
      const imageUrl = cloudinaryResponse.data.secure_url;

      // Update the vehicleImage URL in the backend
      const updateUrl = `http://localhost:8000/api/vehicles/${selectedVehicleId}`;
      const updateResponse = await axios.put(updateUrl, { vehicleImage: imageUrl }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (updateResponse.status === 200 || updateResponse.status === 201) {
        // Update the vehicle list state with the new image URL
        setVehicles(prevVehicles =>
          prevVehicles.map(vehicle =>
            vehicle.vehicleId === selectedVehicleId
              ? { ...vehicle, vehicleImage: imageUrl }
              : vehicle
          )
        );
        toast.success('Vehicle image updated successfully!');
      } else {
        throw new Error(`Unexpected response status: ${updateResponse.status}`);
      }

      setImageFile(null);
      setSelectedVehicleId(null);
    } catch (error) {
      console.error('Error uploading image or updating vehicle:', error);

      // Provide more detailed feedback for different types of errors
      if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.response?.data?.message || 'Failed to update vehicle image'}`);
      } else {
        toast.error('Error updating vehicle image. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manage Vehicles</h1>

      {loading && <Loading />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <div key={vehicle.vehicleId} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
            <div className="relative mb-4">
              {vehicle.vehicleImage ? (
                <img
                  src={vehicle.vehicleImage}
                  alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`}
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-700"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600 dark:text-gray-400">No Image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, vehicle.vehicleId)}
                className="absolute top-2 right-2"
              />
            </div>
            <h2 className="text-xl font-semibold">{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
            <p className="text-gray-600 dark:text-gray-300">Year: {vehicle.specifications.year}</p>
            <p className="text-gray-600 dark:text-gray-300">Fuel Type: {vehicle.specifications.fuelType}</p>
            <p className="text-gray-600 dark:text-gray-300">Transmission: {vehicle.specifications.transmission}</p>
            <p className="text-gray-600 dark:text-gray-300">Color: {vehicle.specifications.color}</p>
            <p className="text-gray-600 dark:text-gray-300">Seating Capacity: {vehicle.specifications.seatingCapacity}</p>
            <p className="text-gray-600 dark:text-gray-300">Features: {vehicle.specifications.features}</p>
            <p className="text-gray-600 dark:text-gray-300">Status: {vehicle.fleetManagement.status}</p>
          </div>
        ))}
      </div>

      {imageFile && selectedVehicleId !== null && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default VehicleManagement;
