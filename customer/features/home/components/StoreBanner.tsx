"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { getPublicStore } from "@/services/store.service";

export default function StoreBanner() {
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    getPublicStore().then((res) => setStore(res.data)).catch(() => {});
  }, []);

  if (!store) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-600">
          <MapPin size={18} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-green-700">Pickup Store</p>
          <p className="text-sm font-bold text-slate-800">{store.name}</p>
          <p className="text-xs text-slate-500">{store.address}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-right">
        {store.openTime && store.closeTime && (
          <div>
            <div className="flex items-center justify-end gap-1 text-green-600">
              <Clock size={12} />
              <p className="text-xs font-semibold">{store.openTime} – {store.closeTime}</p>
            </div>
            <p className="text-[10px] text-slate-400">Operating hours</p>
          </div>
        )}
        <ChevronRight size={16} className="text-slate-400" />
      </div>
    </div>
  );
}
