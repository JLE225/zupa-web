import axios from "axios";
import { axiosInstance } from "./axios";

export const register = async (registerData) => {
  const response = await axiosInstance.post("/auth/register", registerData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/myprofile");
  return res.data;
};

export const completeRegistration = async (userData) => {
  const res = await axios.post("/auth/complete-registration", userData);
  return res.data;
};

export const uploadProfile = async () => {
  const res = await axios.post("/user/upload-picture", userData);
  return res.data;
};
