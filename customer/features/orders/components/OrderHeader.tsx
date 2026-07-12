"use client";

import { orders } from "@/mock/orders";
import { PackageCheck, ShoppingBag } from "lucide-react";

export default function OrderHeader() {
  const pending = orders.filter((o) => o.status === "NEW").length;
  const ready = orders.filter((o) => o.status === "READY").length;

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Order Fulfillment</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Accept, assign, pick, pack, and verify store pickup orders.
        </p>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {pending > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2">
            <ShoppingBag size={14} className="text-orange-500" />
            <span className="text-xs font-semibold text-orange-600">
              {pending} waiting
            </span>
          </div>
        )}
        {ready > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-violet-100 bg-violet-50 px-3 py-2">
            <PackageCheck size={14} className="text-violet-500" />
            <span className="text-xs font-semibold text-violet-600">
              {ready} ready for pickup
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
