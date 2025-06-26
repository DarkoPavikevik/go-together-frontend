import axios from "axios";

export const getReviews = async () => {
  const response = await axios.get(`http://localhost:8080/api/reviews`);
  return response ? response.data : response;
};
