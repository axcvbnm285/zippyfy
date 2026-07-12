"use client";

import { useState } from "react";
import { ShoppingBasket, User, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import OrderDetailsSheet from "./OrderDetailsSheet";

interface Props {
  order: any;
  onStatusChange: (id: string, status: string) => void;
}

const statusAccent: Record<string, string> = {
  NEW:       "border-l-orange-400",
  PACKING:   "border-l-blue-400",
  READY:     "border-l-violet-400",
  COLLECTED: "border-l-emerald-400",
};

export default function OrderCard({ order, onStatusChange }: Props) {
  const [open, setOpen] = useState(false);
  const customerName = order.customer?.name ?? "Customer";
  const customerPhone = order.customer?.phone ?? "";
  const itemCount = order.items?.length ?? 0;
  const placedAt = new Date(order.placedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer rounded-xl border-l-4 bg-white p-4 shadow-sm",
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
          statusAccent[order.status] ?? "border-l-slate-300"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{order.id.slice(0, 8)}...</p>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <Clock size={10} /> {placedAt}
            </div>
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
            order.paymentMethod === "CASH_ON_PICKUP" ? "bg-slate-100 text-slate-500" : "bg-green-100 text-green-600"
          )}>
            {order.paymentMethod === "CASH_ON_PICKUP" ? "Cash" : "Online"}
          </span>
        </div>

        <div className="my-3 h-px bg-slate-100" />

        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <User size={14} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">{customerName}</p>
            {customerPhone && <p className="text-xs text-slate-400">{customerPhone}</p>}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShoppingBasket size={12} /> {itemCount} items
          </div>
          <span className="text-sm font-bold text-slate-800">₹{order.total}</span>
        </div>

        {order.pickupCode && (
          <div className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-500">Pickup Code</p>
            <p className="text-2xl font-black tracking-[0.2em] text-violet-700">{order.pickupCode}</p>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={10} /> Store Pickup
        </div>

        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          {order.status === "NEW" && (
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="w-full" onClick={() => onStatusChange(order.id, "PACKING")}>Accept</Button>
              <Button size="sm" variant="destructive" className="w-full" onClick={() => onStatusChange(order.id, "REJECTED")}>Reject</Button>
            </div>
          )}
          {order.status === "PACKING" && (
            <Button size="sm" className="w-full" onClick={() => onStatusChange(order.id, "READY")}>Mark Ready</Button>
          )}
          {order.status === "READY" && (
            <Button size="sm" className="w-full" onClick={() => onStatusChange(order.id, "COLLECTED")}>Verify &amp; Collect</Button>
          )}
          {order.status === "COLLECTED" && (
            <div className="rounded-lg bg-emerald-50 py-2 text-center text-xs font-semibold text-emerald-600">✓ Completed</div>
          )}
        </div>
      </div>

      <OrderDetailsSheet open={open} onOpenChange={setOpen} order={order} onStatusChange={onStatusChange} />
    </>
  );
}
