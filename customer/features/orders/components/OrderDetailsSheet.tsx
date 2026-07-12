"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, User, Phone, MapPin, PackageCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { verifyPickup } from "@/services/order.service";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
  onStatusChange: (id: string, status: string) => void;
}

const statusStyle: Record<string, string> = {
  NEW:       "bg-orange-100 text-orange-600",
  PACKING:   "bg-blue-100 text-blue-600",
  READY:     "bg-violet-100 text-violet-600",
  COLLECTED: "bg-emerald-100 text-emerald-600",
  REJECTED:  "bg-red-100 text-red-500",
};

const timeline = [
  { key: "placedAt",    label: "Order Placed",      icon: Clock },
  { key: "acceptedAt",  label: "Accepted & Packing", icon: PackageCheck },
  { key: "readyAt",     label: "Ready for Pickup",   icon: MapPin },
  { key: "collectedAt", label: "Collected",          icon: CheckCircle },
];

export default function OrderDetailsSheet({ open, onOpenChange, order, onStatusChange }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  if (!order) return null;

  const customerName = order.customer?.name ?? "Customer";
  const customerPhone = order.customer?.phone ?? "";

  const handleVerify = async () => {
    setVerifying(true);
    try {
      await verifyPickup(code.trim().toUpperCase());
      onStatusChange(order.id, "COLLECTED");
      onOpenChange(false);
      setCode(""); setError("");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Verification failed.");
    } finally {
      setVerifying(false);
    }
  };

  const fmt = (d: string | null) => d ? new Date(d).toLocaleString() : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-md">
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-mono">{order.id.slice(0, 12)}...</SheetTitle>
            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", statusStyle[order.status] ?? "bg-muted text-muted-foreground")}>
              {order.status}
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} /> {new Date(order.placedAt).toLocaleString()}
          </p>
        </SheetHeader>

        <div className="flex flex-col gap-5 p-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Customer</p>
            <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">{customerName}</p>
                {customerPhone && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone size={10} /> {customerPhone}
                  </p>
                )}
              </div>
              <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={11} /> Store Pickup
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Items</p>
            <div className="divide-y divide-border rounded-xl border">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.qty} {item.unit}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              ))}
              <div className="flex items-center justify-between bg-muted/30 px-4 py-2.5">
                <p className="text-sm font-semibold">Total</p>
                <p className="text-sm font-bold">₹{order.total}</p>
              </div>
            </div>
          </div>

          {order.pickupCode && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pickup Code</p>
                <div className="flex items-center justify-center rounded-xl bg-violet-50 py-6">
                  <div className="text-center">
                    <p className="text-4xl font-black tracking-[0.3em] text-violet-700">{order.pickupCode}</p>
                    <p className="mt-1 text-xs text-violet-400">Customer must show this code</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {order.status === "READY" && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Verify Pickup</p>
                <div className="space-y-2">
                  <input
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError(""); }}
                    placeholder="Enter customer's pickup code"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {error && <p className="text-xs text-destructive">{error}</p>}
                  <Button className="w-full" onClick={handleVerify} disabled={verifying || !code.trim()}>
                    {verifying ? "Verifying..." : "Verify & Mark Collected"}
                  </Button>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Timeline</p>
            <div className="space-y-3">
              {timeline.map(({ key, label, icon: Icon }) => {
                const value = fmt(order[key]);
                return (
                  <div key={key} className={cn("flex items-center gap-3", !value && "opacity-30")}>
                    <div className={cn("flex size-7 items-center justify-center rounded-full", value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                      <Icon size={13} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{label}</p>
                      {value && <p className="text-[10px] text-muted-foreground">{value}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
