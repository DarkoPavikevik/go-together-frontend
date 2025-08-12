import axios from "axios";

export interface IUpdateBody {
  userId: number;
  rideId: number;
  status: string;
  emailSent: boolean;
  username: string;
  phoneNumber: string | null;
}
export interface IRequestBody {
  rideId: number;
  pickupLocation: number[] | string;
  dropoffLocation: string;
  note: string;
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

export const requestToJoin = async (body: IRequestBody) => {
  const response = await axios.post(
    `http://localhost:8080/api/bookings/request`,
    body
  );
  return response ? response.data : response;
};

export const sendMessage = async (body: {
  receiverId: number;
  senderId: number;
  message: string;
}) => {
  const response = await axios.post(
    `http://localhost:8080/api/chat/send`,
    body
  );
  return response ? response.data : response;
};

export const getBooking = async (id: number) => {
  const response = await axios.get(`http://localhost:8080/api/bookings/${id}`);
  return response ? response.data : response;
};
