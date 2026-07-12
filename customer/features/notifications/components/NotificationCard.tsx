import { Package, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationCard({ n }: { n: Notification }) {
  return (
    <div className={cn("flex gap-3 rounded-2xl border p-4 transition", n.read ? "border-slate-100 bg-white" : "border-green-100 bg-green-50")}>
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", n.type === "PICKUP" ? "bg-green-100" : "bg-slate-100")}>
        {n.type === "PICKUP" ? (
          <QrCode size={18} className="text-green-600" />
        ) : (
          <Package size={18} className="text-slate-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-800">{n.title}</p>
          {!n.read && <span className="size-2 shrink-0 rounded-full bg-green-500 mt-1" />}
        </div>
        <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{n.message}</p>
        <p className="mt-1.5 text-[10px] text-slate-400">{n.createdAt}</p>
      </div>
    </div>
  );
}
