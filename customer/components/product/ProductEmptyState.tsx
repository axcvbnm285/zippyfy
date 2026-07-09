"use client";

import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed bg-white py-20 text-center">

      <PackageOpen
        size={70}
        className="mx-auto text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        No Products Yet
      </h2>

      <p className="mt-2 text-slate-500">
        Add your first product to start selling.
      </p>

      <Button className="mt-8">
        Add Product
      </Button>

    </div>
  );
}