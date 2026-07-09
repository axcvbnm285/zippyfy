"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CategorySearch() {
  return (
    <div className="relative max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <Input
        placeholder="Search categories..."
        className="h-11 rounded-xl pl-10"
      />
    </div>
  );
}