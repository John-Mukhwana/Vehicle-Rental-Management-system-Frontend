

//Booking types
export interface Booking {
  bookingId?: number; // Optional
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: string;
  bookingStatus: 'Pending' | 'Confirmed' | 'Cancelled'; // Enum values
  createdAt?: string;
  updatedAt?: string;
}
// src/types.ts

export interface TSVehicle {
    year: number;
    vehicleId: number;
    vehicleName: string;
    rentalRate: string | null;
    availability: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }
  
  export interface VehicleSpecifications {
    year: number;
    fuelType: string;
    transmission: string;
    color: string;
    seatingCapacity: number;
    features: string;
  }
  
  export interface FleetManagement {
    status: string;
  }
  
  export type ExtendedTSVehicle = TSVehicle & {
    specifications: VehicleSpecifications;
    fleetManagement: FleetManagement;
    vehicleId: number;

    manufacturer: string;
  
    model: string;
  
    year: number;
  
    fuelType: string;
  
    transmission: string;
  
    color: string;
  
    seatingCapacity: number;
  
    features: string;
  
    status: string
  };
  
