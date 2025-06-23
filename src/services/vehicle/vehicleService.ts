import axios from "axios";

interface IVehicle {
  userId?: number;
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
}

export const updateVehicle = async (id: number, body: IVehicle) => {
  const response = await axios.put(
    `http://localhost:8080/api/vehicles/${id}`,
    body
  );
  return response ? response.data : response;
};

export const createVehicle = async (userid: number, body: IVehicle) => {
  const response = await axios.post(
    `http://localhost:8080/api/vehicles/user/${userid}`,
    body
  );
  return response ? response.data : response;
};
