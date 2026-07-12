import api from "./api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const registerStore = async (data: {
  name: string;
  email: string;
  password: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  openTime: string;
  closeTime: string;
}) => {
  const response = await api.post("/auth/register/store", data);
  return response.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};