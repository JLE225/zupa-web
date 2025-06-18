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

export const completeOnboarding = async (userData) => {
  const res = await axios.post("/auth/onboarding", userData);
  return res.data;
};
