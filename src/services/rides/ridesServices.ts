import axios from "axios";

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
