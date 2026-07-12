"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, PackageCheck, ScanLine, Search, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getStoreOrders, verifyPickup } from "@/services/order.service";

export default function PickupVerificationPanel() {
  const [orders, setOrders] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStoreOrders("READY").then((res) => setOrders(res.data));
  }, []);

  const normalizedQuery = query.trim().toUpperCase();
  const matchedOrder = useMemo(
    () => orders.find((o) => o.pickupCode?.toUpperCase() === normalizedQuery),
    [normalizedQuery, orders]
  );

  const handleVerify = async () => {
    if (!normalizedQuery) return;
    setLoading(true);
    try {
      await verifyPickup(normalizedQuery);
      setOrders((prev) => prev.filter((o) => o.pickupCode?.toUpperCase() !== normalizedQuery));
      setMessage(`Order verified and marked as collected.`);
      setIsSuccess(true);
      setQuery("");
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Verification failed.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Pickup Code Verification</CardTitle>
          <CardDescription>Verify the code shown by the customer before handing over the order.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value.toUpperCase()); setMessage(""); }}
                placeholder="Enter pickup code"
                className="h-10 pl-9 uppercase tracking-widest"
              />
            </div>
            <Button disabled={!normalizedQuery || loading} onClick={handleVerify}>
              <ScanLine size={15} />
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>

          {message && (
            <div className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium", isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600")}>
              {isSuccess ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {message}
            </div>
          )}

          {matchedOrder ? (
            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{matchedOrder.id.slice(0, 12)}...</p>
                  <h2 className="mt-1 text-lg font-semibold">{matchedOrder.customer?.name}</h2>
                  {matchedOrder.customer?.phone && <p className="text-sm text-muted-foreground">{matchedOrder.customer.phone}</p>}
                </div>
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-600">READY</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Pickup Code</p>
                  <p className="mt-1 text-xl font-black tracking-[0.2em]">{matchedOrder.pickupCode}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Items</p>
                  <p className="mt-1 text-lg font-semibold">{matchedOrder.items?.length}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="mt-1 text-lg font-semibold">₹{matchedOrder.total}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground">
              Search a ready order by pickup code.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ready Counter</CardTitle>
          <CardDescription>Orders packed and waiting for customer arrival.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {orders.length === 0 ? (
            <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
              No orders waiting at the counter.
            </div>
          ) : (
            orders.map((order) => (
              <button
                key={order.id}
                className="flex w-full items-center justify-between rounded-lg border bg-background px-3 py-3 text-left transition-colors hover:bg-muted/50"
                onClick={() => { setQuery(order.pickupCode ?? ""); setMessage(""); }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <PackageCheck size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.customer?.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.readyAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-violet-700">
                  <ShieldCheck size={15} />
                  {order.pickupCode}
                </div>
              </button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
