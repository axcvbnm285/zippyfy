"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package, PackageCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStoreOrders } from "@/services/order.service";

export default function OperationsCards() {
  const [counts, setCounts] = useState({ NEW: 0, PACKING: 0, READY: 0, COLLECTED: 0 });

  useEffect(() => {
    getStoreOrders().then((res) => {
      const orders: any[] = res.data;
      setCounts({
        NEW:       orders.filter((o) => o.status === "NEW").length,
        PACKING:   orders.filter((o) => o.status === "PACKING").length,
        READY:     orders.filter((o) => o.status === "READY").length,
        COLLECTED: orders.filter((o) => o.status === "COLLECTED").length,
      });
    });
  }, []);

  const stats = [
    { title: "New Orders",       value: counts.NEW,       sub: "Awaiting acceptance",    icon: ShoppingBag,  color: "text-orange-500",  bg: "bg-orange-50" },
    { title: "Being Packed",     value: counts.PACKING,   sub: "Currently being packed", icon: Package,      color: "text-blue-500",    bg: "bg-blue-50" },
    { title: "Ready for Pickup", value: counts.READY,     sub: "Waiting for customer",   icon: PackageCheck, color: "text-violet-500",  bg: "bg-violet-50" },
    { title: "Collected Today",  value: counts.COLLECTED, sub: "Successfully completed", icon: CheckCircle,  color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ title, value, sub, icon: Icon, color, bg }) => (
        <Card key={title} className="bg-background transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className={cn("flex size-9 items-center justify-center rounded-lg", bg)}>
              <Icon size={18} className={color} />
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-0.5 text-xs font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
