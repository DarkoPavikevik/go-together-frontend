import type { QueryObserverResult } from "@tanstack/react-query";

export interface Me {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  rating?: number;
  created?: string;
  phoneNumber?: string;
  numberOfRides?: number;
  smoking?: boolean;
  pets?: boolean;
  music?: boolean;
  talking?: boolean;
  vehicle: {
    id: number;
    brand: string;
    model: string;
    picture: string;
    plateNumber: string;
    seats: number;
    year: number;
    color: string;
    airCondition: boolean;
    usbCharging: boolean;
    music: boolean;
    comfortableSeats: boolean;
  };
}
export interface UserContextType {
  me: Me | null;
  login(jwt: string): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated: boolean | null;
  refetch(): Promise<QueryObserverResult<unknown, Error>>;
}

export interface RideDTO {
  id?: number;
  userInfo: {
    id: number;
  };
  fromLocation: string;
  toLocation: string;
  date: string;
  time: string; // Format: "HH:mm:ss"
  price: number;
  seatsAvailable: number;
  status?: string;
  luggageSize: "SMALL" | "MEDIUM" | "LARGE"; // Uppercase to match backend
  currency: string;
  waypoints?: string[];
  notes?: string;
}
