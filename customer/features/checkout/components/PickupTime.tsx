"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const slots = ["ASAP (15–20 min)", "In 30 mins", "In 1 hour", "In 2 hours"];

export default function PickupTime() {
  const [selected, setSelected] = useState(slots[0]);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-green-600" />
        <h3 className="text-sm font-bold text-slate-800">Pickup Time</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelected(slot)}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-xs font-semibold transition",
              selected === slot
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-200 text-slate-600 hover:border-green-300"
            )}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
