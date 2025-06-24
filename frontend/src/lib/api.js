import { axiosInstance } from "./axios";

export const register = async (registerData) => {
  const response = await axiosInstance.post("/auth/register", registerData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/myprofile");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser: ", error);
    return null;
  }
};

export const completeRegistration = async (userData) => {
  const res = await axiosInstance.post("/auth/complete-registration", userData);
  return res.data;
};

export const uploadProfile = async () => {
  const res = await axiosInstance.post("/user/upload-picture", userData);
  return res.data;
};

export async function getUsersFriends() {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
}

export async function getRecomendedUsers() {
  const res = await axiosInstance.get("/users");
  return res.data;
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}

export async function getFriendRequests() {
  const res = await axiosInstance.get("/users/friend-requests/");
  return res.data;
}

export async function acceptFriendRequest(requestId) {
  const res = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return res.data;
}

export async function declineFriendRequest(id) {
  const res = await axiosInstance.delete(`/users/friend-request/${id}/decline`);
  return res.data;
}

export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
}
