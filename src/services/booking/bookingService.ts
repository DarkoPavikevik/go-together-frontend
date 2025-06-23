import axios from "axios";

export interface IUpdateBody {
  userId: number;
  rideId: number;
  status: string;
  emailSent: boolean;
  username: string;
  phoneNumber: string | null;
}

export const getAllBookings = async () => {
  const response = await axios.get(`http://localhost:8080/api/bookings`);
  return response ? response.data : response;
};

export const updateBooking = async (id: number, body: IUpdateBody) => {
  const response = await axios.put(
    `http://localhost:8080/api/bookings/${id}`,
    body
  );
  return response ? response.data : response;
};
