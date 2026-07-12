import { Bell } from "lucide-react";

export default function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-slate-100">
        <Bell size={36} className="text-slate-300" />
      </div>
      <p className="mt-4 text-base font-semibold text-slate-700">No notifications yet</p>
      <p className="text-sm text-slate-400">We'll notify you about your orders here</p>
    </div>
  );
}
