import { MapPin, Clock } from "lucide-react";

interface Props {
  store: { name: string; address: string; openTime?: string; closeTime?: string } | null;
}

export default function StoreInfo({ store }: Props) {
  if (!store) return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 animate-pulse h-20" />
  );

  return (
    <div className="rounded-2xl border border-green-100 bg-green-50 p-4 space-y-3">
      <h3 className="text-sm font-bold text-slate-800">Pickup Location</h3>
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-600">
          <MapPin size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{store.name}</p>
          <p className="text-xs text-slate-500">{store.address}</p>
          {store.openTime && store.closeTime && (
            <div className="mt-1.5 flex items-center gap-1 text-green-700">
              <Clock size={12} />
              <span className="text-xs font-semibold">{store.openTime} – {store.closeTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
