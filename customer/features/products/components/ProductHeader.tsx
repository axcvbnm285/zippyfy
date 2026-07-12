import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Products</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Manage your store inventory.</p>
      </div>
      <Button size="sm" render={<Link href="/dashboard/products/add" />}>
        <Plus size={15} />
        Add Product
      </Button>
    </div>
  );
}
