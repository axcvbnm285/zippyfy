import Link from "next/link";
import { ClipboardList, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";

const items = [
  { label: "My Orders", href: "/orders", icon: ClipboardList },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Help & Support", href: "#", icon: HelpCircle },
];

export default function SettingsCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {items.map(({ label, href, icon: Icon }, i) => (
        <Link
          key={label}
          href={href}
          className={`flex items-center gap-3 px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${i !== 0 ? "border-t border-slate-100" : ""}`}
        >
          <Icon size={17} className="text-slate-400" />
          {label}
          <ChevronRight size={15} className="ml-auto text-slate-300" />
        </Link>
      ))}
      <button className="flex w-full items-center gap-3 border-t border-slate-100 px-5 py-4 text-sm font-semibold text-red-500 transition hover:bg-red-50">
        <LogOut size={17} />
        Sign Out
      </button>
    </div>
  );
}
