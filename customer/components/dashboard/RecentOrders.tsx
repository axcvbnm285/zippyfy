"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#1001", customer: "Abhinav", amount: "₹430", status: "Delivered" },
  { id: "#1002", customer: "Rahul", amount: "₹890", status: "Pending" },
  { id: "#1003", customer: "Sourish", amount: "₹210", status: "Delivered" },
  { id: "#1004", customer: "Aman", amount: "₹1,200", status: "Cancelled" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Delivered: "default",
  Pending: "secondary",
  Cancelled: "destructive",
};

export default function RecentOrders() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest transactions from your store</CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-2">
        <div className="divide-y divide-border">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/40"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{order.customer}</p>
                <p className="text-xs text-muted-foreground">{order.id}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium tabular-nums">{order.amount}</span>
                <Badge variant={statusVariant[order.status] ?? "outline"}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
