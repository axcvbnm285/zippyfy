"use client";

import { useEffect, useState } from "react";
import { getStoreOrders, updateOrderStatus } from "@/services/order.service";
import OrderColumn from "./OrderColumn";

const columns = [
  { status: "NEW",       title: "New Orders" },
  { status: "PACKING",   title: "Packing" },
  { status: "READY",     title: "Ready for Pickup" },
  { status: "COLLECTED", title: "Collected" },
];

export default function OrdersKanban() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStoreOrders().then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => o.id === id ? res.data : o));
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Failed to update status.");
    }
  };

  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground">Loading orders...</div>;

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map(({ status, title }) => (
        <OrderColumn
          key={status}
          status={status}
          title={title}
          orders={orders.filter((o) => o.status === status)}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
}
