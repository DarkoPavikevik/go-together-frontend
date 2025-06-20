import axios from "axios";
import type { RideDTO } from "../../context/AuthContext/types";

export const getRides = async (page?: number, size?: number) => {
  const response = await axios.get(
    `http://localhost:8080/api/rides?page=${page}&size=${size}&sortBy=price&direction=desc'`
  );
  return response ? response.data : response;
};

export const getCitiesByCountry = async (country: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/cities/${country}`
  );
  return response ? response.data : response;
};

export const createRide = async (rideData: RideDTO): Promise<RideDTO> => {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('http://localhost:8080/api/rides/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(rideData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Backend error:', errorData);
    throw new Error(errorData.message || 'Failed to create ride');
  }

  return response.json();
};

export const searchRide = async (
  from: undefined | string,
  to: undefined | string,
  date: undefined | string
) => {
  const response = await axios.get(
    `http://localhost:8080/api/rides/search?from=${from}&to=${to}&date=${date}`
  );
  return response ? response.data : response;
};

export const popularRides = async () => {
  const response = await axios.get(`http://localhost:8080/api/rides/popular`);
  return response ? response.data : response;
};

export const getRideById = async (id: number) => {
  const response = await axios.get(`http://localhost:8080/api/rides/${id}`);
  return response ? response.data : response;
};
