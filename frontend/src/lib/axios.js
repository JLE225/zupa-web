import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:2205/api",
  withCredentials: true,
});
