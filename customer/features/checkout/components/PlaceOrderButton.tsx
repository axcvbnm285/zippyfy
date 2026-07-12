"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export default function PlaceOrderButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/orders")}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
    >
      <ShoppingBag size={18} />
      Place Order
    </button>
  );
}
