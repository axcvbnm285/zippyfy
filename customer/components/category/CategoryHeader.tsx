"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CategoryHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Categories
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your product categories.
        </p>
      </div>

      <Button size="lg">
        <Plus className="mr-2 h-5 w-5" />
        Add Category
      </Button>
    </div>
  );
}