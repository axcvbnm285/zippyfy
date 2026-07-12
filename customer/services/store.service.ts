import api from "./api";

export const createStore = async (data: any) => {
  const response = await api.post("/stores", data);

  return response.data;
};

export const getMyStore = async () => {
  const response = await api.get("/stores/me");
  return response.data;
};

export const getPublicStore = async () => {
  const response = await api.get("/stores/public");
  return response.data;
};