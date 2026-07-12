"use client";

import { Bell, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        <div>
          <h1 className="text-2xl font-bold text-green-600">
            Zippyfy
          </h1>

          <p className="text-sm text-slate-500">
            Smart Pickup
          </p>
        </div>

        <div className="flex gap-2">

          <Button
            variant="ghost"
            size="icon"
          >
            <Bell size={20}/>
          </Button>

          <Button
            variant="ghost"
            size="icon"
          >
            <ShoppingCart size={20}/>
          </Button>

        </div>

      </div>
    </header>
  );
}