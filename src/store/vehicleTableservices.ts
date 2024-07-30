// src/services/vehicleTableservice.ts

import axios from 'axios';

const API_URL = 'https://exotravel-vehicle-rental-management.onrender.com/api/vehicles';

// Function to retrieve the token from local storage
const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  }
});

// Function to clean up vehicle data to ensure no circular references
const cleanVehicleData = (vehicle: any) => {
  const { __proto__, ...cleanedVehicle } = vehicle;
  return cleanedVehicle;
};

export const deleteVehicle = async (vehicleId: number) => {
  try {
    await axios.delete(`${API_URL}/${vehicleId}`, authHeaders());
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error; // Rethrow to handle in the calling function
  }
};

export const updateVehicle = async (vehicle: any) => {
  console.log('Updating vehicle with data:', vehicle); // Log payload for debugging

  try {
    const cleanedVehicle = cleanVehicleData(vehicle);
    const response = await axios.put(`${API_URL}/${cleanedVehicle.vehicleId}`, cleanedVehicle, authHeaders());
    return response.data;
  } catch (error) {
    console.error('Failed to update vehicle:', error);
    throw error; // Rethrow to handle in the calling function
  }
};

export const getVehicles = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_URL, authHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};
