import axios from "axios";
import type { IRegisterType } from "../../utils/types/RegisterType";

export default function useAuthController() {
  const register = async (body: IRegisterType) => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      body
    );
    return response ? response.data : response;
  };

  const getUser = async (id: number) => {
    const response = await axios.get(`http://localhost:8080/api/user/${id}`);
    return response ? response.data : response;
  };

  return { register, getUser };
}
