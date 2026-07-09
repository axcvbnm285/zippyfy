"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold tracking-tight">
          Products
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all your store products
        </p>

      </div>

      <Button
        size="lg"
        className="rounded-xl"
      >
        <Plus className="mr-2 h-5 w-5" />

        Add Product

      </Button>

    </div>
  );
}