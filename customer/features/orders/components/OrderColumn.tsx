"use client";

import OrderCard from "./OrderCard";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  status: string;
  orders: any[];
  onStatusChange: (id: string, status: string) => void;
}

const columnTheme: Record<string, { bg: string; dot: string; count: string }> = {
  NEW:       { bg: "bg-orange-50 border-orange-100",  dot: "bg-orange-400",  count: "bg-orange-100 text-orange-600" },
  PACKING:   { bg: "bg-blue-50 border-blue-100",      dot: "bg-blue-400",    count: "bg-blue-100 text-blue-600" },
  READY:     { bg: "bg-violet-50 border-violet-100",  dot: "bg-violet-400",  count: "bg-violet-100 text-violet-600" },
  COLLECTED: { bg: "bg-emerald-50 border-emerald-100",dot: "bg-emerald-400", count: "bg-emerald-100 text-emerald-600" },
};

export default function OrderColumn({ title, status, orders, onStatusChange }: Props) {
  const theme = columnTheme[status] ?? { bg: "bg-slate-50 border-slate-100", dot: "bg-slate-400", count: "bg-slate-100 text-slate-600" };

  return (
    <div className={cn("flex flex-col rounded-2xl border p-4", theme.bg)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", theme.dot)} />
          <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
        </div>
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", theme.count)}>
          {orders.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-xs text-slate-400">
            No orders
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
          ))
        )}
      </div>
    </div>
  );
}
