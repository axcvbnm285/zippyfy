"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { orders } from "@/mock/orders";
import { cn } from "@/lib/utils";

const stages = [
  { status: "NEW",       label: "New",       dot: "bg-orange-400", text: "text-orange-600", bg: "bg-orange-50" },
  { status: "PACKING",   label: "Packing",   dot: "bg-blue-400",   text: "text-blue-600",   bg: "bg-blue-50" },
  { status: "READY",     label: "Ready",     dot: "bg-violet-400", text: "text-violet-600", bg: "bg-violet-50" },
  { status: "COLLECTED", label: "Collected", dot: "bg-emerald-400",text: "text-emerald-600",bg: "bg-emerald-50" },
];

export default function OperationsBoard() {
  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order Pipeline</CardTitle>
          <CardDescription>Live fulfillment status across all stages</CardDescription>
        </div>
        <Link href="/dashboard/orders" className="text-xs font-medium text-primary hover:underline">View all</Link>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map(({ status, label, dot, text, bg }) => {
            const stageOrders = orders.filter((o) => o.status === status);
            return (
              <div key={status} className={cn("rounded-xl p-4", bg)}>
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", dot)} />
                  <span className={cn("text-xs font-semibold uppercase tracking-wide", text)}>{label}</span>
                  <span className={cn("ml-auto text-xs font-bold", text)}>{stageOrders.length}</span>
                </div>
                <div className="space-y-2">
                  {stageOrders.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No orders</p>
                  ) : (
                    stageOrders.slice(0, 3).map((o) => (
                      <div key={o.id} className="rounded-lg bg-white/70 px-3 py-2">
                        <p className="truncate text-xs font-semibold">{o.customer}</p>
                        <p className="text-[10px] text-muted-foreground">{o.id} · &#8377;{o.total}</p>
                      </div>
                    ))
                  )}
                  {stageOrders.length > 3 && (
                    <p className="text-[10px] text-muted-foreground pl-1">+{stageOrders.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
