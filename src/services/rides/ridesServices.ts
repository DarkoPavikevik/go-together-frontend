import axios from "axios";

export const getRides = async (page?: number, size?: number) => {
  const response = await axios.get(
    `http://localhost:8080/api/rides?page=${page}&size=${size}&sortBy=price&direction=desc'`
  );
  return response ? response.data : response;
};
