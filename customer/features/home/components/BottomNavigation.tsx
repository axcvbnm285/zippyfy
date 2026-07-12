"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, ShoppingCart, ClipboardList, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const items = [
  { label: "Home",    href: "/",         icon: Home },
  { label: "Browse",  href: "/products", icon: Grid2x2 },
  { label: "Cart",    href: "/cart",     icon: ShoppingCart },
  { label: "Orders",  href: "/orders",   icon: ClipboardList },
  { label: "Profile", href: "/profile",  icon: UserCircle2 },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 bg-white/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          const isCart = label === "Cart";
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <Icon size={22} className={cn(active ? "text-green-600" : "text-slate-400")} />
              {isCart && totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
              <span className={cn("text-[10px] font-medium", active ? "text-green-600" : "text-slate-400")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
