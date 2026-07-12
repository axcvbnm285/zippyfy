"use client";

import Link from "next/link";
import { Bell, ShoppingCart, UserCircle2, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-green-600">
            <Zap size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-slate-900">Zippyfy</p>
            <p className="text-[10px] text-slate-400">Smart Pickup</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/notifications" className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-green-500" />
          </Link>

          <Link href="/cart" className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          <Link href="/profile" className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
            <UserCircle2 size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
}
