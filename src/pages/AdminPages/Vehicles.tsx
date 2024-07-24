// src/App.tsx

import React from 'react';
import AdminVehicleTable from '../../components/AdminvehicleTable';
import VehicleManagement from '../../components/AdminVehicleImages';
import { ToastContainer } from 'react-toastify';
import AddVehicleForm from '../../components/AdminAddVehicle';
import AdminAddVehicleSpecifications from '../../components/AdminVehicleSpecficationAdd';

const AdminVehicle: React.FC = () => {
  return (
    <>
      <ToastContainer />
      
      <div className="space-y-6">
        {/* Management Section */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <VehicleManagement />
          <AdminVehicleTable />
          
        </div>
        
        {/* Vehicle Table and Specifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          
          <AdminAddVehicleSpecifications />
          <AddVehicleForm />
        </div>
      </div>
    </>
  );
};

export default AdminVehicle;
