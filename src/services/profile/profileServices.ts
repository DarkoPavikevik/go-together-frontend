import axios from "axios";
export type PreferenceUpdateBody = {
  smoking?: boolean;
  pets?: boolean;
  music?: boolean;
  talking?: boolean;
};

export interface IUpdateProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture?: string;
}

export const updatePreference = async (
  id: number,
  body: PreferenceUpdateBody
) => {
  const response = await axios.put(
    `http://localhost:8080/api/user/preferences/${id}`,
    body
  );
  return response ? response.data : response;
};

export const updateProfile = async (id: number, body: IUpdateProfile) => {
  console.log("body vnatre", body);
  const response = await axios.put(
    `http://localhost:8080/api/user/${id}`,
    body
  );
  return response ? response.data : response;
};
