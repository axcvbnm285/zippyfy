"use client";

import { Button } from "@/components/ui/button";

export default function ProductPagination() {
  return (
    <div className="mt-8 flex items-center justify-between">
      <p className="text-sm text-slate-500">
        Showing 1–4 of 24 products
      </p>

      <div className="flex gap-2">
        <Button variant="outline">Previous</Button>

        <Button>1</Button>

        <Button variant="outline">2</Button>

        <Button variant="outline">3</Button>

        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
}