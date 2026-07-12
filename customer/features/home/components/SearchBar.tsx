"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        placeholder="Search products..."
        className="h-14 w-full rounded-2xl border bg-white pl-14 pr-4 text-sm outline-none transition focus:border-green-500"
      />

    </div>
  );
}