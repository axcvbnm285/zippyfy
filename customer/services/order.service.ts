import api from "./api";

export const placeOrder = async (data: {
  storeId: string;
  paymentMethod: "CASH_ON_PICKUP" | "ONLINE";
  note?: string;
  items: { productId: string; qty: number }[];
}) => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my");
  return response.data;
};

export const getStoreOrders = async (status?: string) => {
  const response = await api.get("/orders/store", { params: status ? { status } : {} });
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};

export const verifyPickup = async (pickupCode: string) => {
  const response = await api.post("/orders/verify-pickup", { pickupCode });
  return response.data;
};
