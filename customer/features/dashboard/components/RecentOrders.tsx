"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getStoreOrders } from "@/services/order.service";

const statusStyle: Record<string, string> = {
  NEW:       "bg-orange-100 text-orange-600",
  PACKING:   "bg-blue-100 text-blue-600",
  READY:     "bg-violet-100 text-violet-600",
  COLLECTED: "bg-emerald-100 text-emerald-600",
  REJECTED:  "bg-red-100 text-red-500",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getStoreOrders().then((res) => setOrders(res.data.slice(0, 5)));
  }, []);

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest pickup orders</CardDescription>
        </div>
        <Link href="/dashboard/orders" className="text-xs font-medium text-primary hover:underline">View all</Link>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        {orders.length === 0 ? (
          <p className="px-5 py-4 text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/40">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{order.customer?.name ?? "Customer"}</p>
                  <p className="text-xs text-muted-foreground">{order.id.slice(0, 10)}... · {new Date(order.placedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="tabular-nums text-sm font-semibold">₹{order.total}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", statusStyle[order.status] ?? "bg-muted text-muted-foreground")}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
