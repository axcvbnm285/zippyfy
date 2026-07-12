import { Phone, MapPin } from "lucide-react";
import { profile } from "@/mock/profile";

export default function AccountInfo() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-800">Account Details</h3>

      <div className="flex items-center gap-3 text-sm text-slate-600">
        <Phone size={16} className="text-slate-400" />
        <span>{profile.phone}</span>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Saved Addresses</p>
        {profile.savedAddresses.map((addr) => (
          <div key={addr.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
            <MapPin size={16} className="mt-0.5 shrink-0 text-green-600" />
            <div>
              <p className="text-xs font-semibold text-slate-700">{addr.label}</p>
              <p className="text-xs text-slate-500">{addr.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
