import api from "./api";

export const createProduct = async (data: any) => {
  const response = await api.post("/products", data);

  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get("/products/featured");

  return response.data;
};