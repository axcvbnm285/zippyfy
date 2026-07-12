"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import StoreInfo from "@/features/checkout/components/StoreInfo";
import PickupTime from "@/features/checkout/components/PickupTime";
import OrderSummary from "@/features/checkout/components/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { placeOrder } from "@/services/order.service";
import { getPublicStore } from "@/services/store.service";
import { ShoppingBag, Loader2, Banknote, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const paymentOptions = [
  { id: "CASH_ON_PICKUP", label: "Cash at Pickup", icon: Banknote },
  { id: "ONLINE",         label: "Online Payment", icon: Smartphone },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const [paymentMethod, setPaymentMethod] = useState<"CASH_ON_PICKUP" | "ONLINE">("CASH_ON_PICKUP");
  const [note, setNote] = useState("");
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublicStore().then((res) => setStore(res.data));
  }, []);

  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items]);

  const handlePlaceOrder = async () => {
    if (!user) { router.push("/login"); return; }
    if (!store) { setError("Store not available."); return; }
    setLoading(true);
    setError("");
    try {
      await placeOrder({
        storeId: store.id,
        paymentMethod,
        note: note.trim() || undefined,
        items: items.map((i) => ({ productId: i.id, qty: i.qty })),
      });
      clearCart();
      router.push("/orders");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-500">Review and confirm your order</p>
        </div>

        <StoreInfo store={store} />
        <PickupTime />

        {/* Payment Method */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800">Payment Method</h3>
          <div className="space-y-2">
            {paymentOptions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPaymentMethod(id as any)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition",
                  paymentMethod === id ? "border-green-600 bg-green-50 text-green-700" : "border-slate-200 text-slate-600 hover:border-green-300"
                )}
              >
                <Icon size={18} />
                {label}
                <span className={cn("ml-auto size-4 rounded-full border-2", paymentMethod === id ? "border-green-600 bg-green-600" : "border-slate-300")} />
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-bold text-slate-800">Note (optional)</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special instructions..."
            rows={2}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-green-500 resize-none"
          />
        </div>

        <OrderSummary />

        {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={loading || !store}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBag size={18} />}
          {loading ? "Placing Order..." : `Place Order · ₹${subtotal()}`}
        </button>
      </div>
      <BottomNavigation />
    </main>
  );
}
