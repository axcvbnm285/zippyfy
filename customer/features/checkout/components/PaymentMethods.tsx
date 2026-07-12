"use client";

import { useState } from "react";
import { Smartphone, Banknote, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const methods = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "cash", label: "Cash at Pickup", icon: Banknote },
  { id: "card", label: "Card", icon: CreditCard },
];

export default function PaymentMethods() {
  const [selected, setSelected] = useState("upi");

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800">Payment Method</h3>
      <div className="space-y-2">
        {methods.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition",
              selected === id
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 text-slate-600 hover:border-green-300"
            )}
          >
            <Icon size={18} />
            {label}
            <span className={cn("ml-auto size-4 rounded-full border-2", selected === id ? "border-green-600 bg-green-600" : "border-slate-300")} />
          </button>
        ))}
      </div>
    </div>
  );
}
