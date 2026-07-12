"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import { getMyOrders } from "@/services/order.service";
import { cn } from "@/lib/utils";
import { ChevronRight, Package } from "lucide-react";

const statusStyles: Record<string, string> = {
  NEW:       "bg-blue-50 text-blue-700",
  PACKING:   "bg-amber-50 text-amber-700",
  READY:     "bg-green-50 text-green-700",
  COLLECTED: "bg-slate-100 text-slate-500",
  REJECTED:  "bg-red-50 text-red-500",
};

const statusLabel: Record<string, string> = {
  NEW:       "Order Placed",
  PACKING:   "Being Packed",
  READY:     "Ready for Pickup",
  COLLECTED: "Collected",
  REJECTED:  "Rejected",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Orders</h1>
          <p className="text-sm text-slate-500">Track and manage your orders</p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package size={48} className="text-slate-200" />
            <p className="mt-4 text-base font-semibold text-slate-700">No orders yet</p>
            <p className="text-sm text-slate-400">Your orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 font-mono">{order.id.slice(0, 12)}...</p>
                  <p className="text-xs text-slate-400">{order.items?.length} items · ₹{order.total}</p>
                  <p className="text-xs text-slate-400">{new Date(order.placedAt).toLocaleString()}</p>
                  {order.status === "READY" && order.pickupCode && (
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1">
                      <span className="text-xs font-semibold text-violet-700">Pickup Code:</span>
                      <span className="text-sm font-black tracking-widest text-violet-800">{order.pickupCode}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", statusStyles[order.status])}>
                    {statusLabel[order.status] ?? order.status}
                  </span>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </main>
  );
}
