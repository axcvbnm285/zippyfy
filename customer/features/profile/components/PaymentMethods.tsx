import { Smartphone } from "lucide-react";
import { profile } from "@/mock/profile";

export default function PaymentMethods() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-slate-800">Payment Methods</h3>
      {profile.paymentMethods.map((pm) => (
        <div key={pm.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-green-50">
            <Smartphone size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">{pm.type}</p>
            <p className="text-xs text-slate-500">{pm.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
