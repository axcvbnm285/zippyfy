"use client";

import Link from "next/link";
import { Pencil, Trash2, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductStatusBadge from "./ProductStatusBadge";

interface Props {
  product: any;
  onDelete: (id: string) => void;
}

export default function ProductRow({ product, onDelete }: Props) {
  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">
      <td className="px-6 py-4">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-14 w-14 rounded-xl object-cover" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
            <ShoppingBasket size={20} className="text-slate-300" />
          </div>
        )}
      </td>
      <td className="px-6 py-4 font-semibold text-slate-800">{product.name}</td>
      <td className="px-6 py-4 text-slate-600">{product.category?.name ?? "—"}</td>
      <td className="px-6 py-4 font-medium">₹{product.sellingPrice}</td>
      <td className="px-6 py-4">{product.stock}</td>
      <td className="px-6 py-4">
        <ProductStatusBadge status={product.isActive ? "active" : "inactive"} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/products/${product.id}/edit`}>
            <Button size="icon" variant="ghost" className="rounded-lg hover:bg-slate-100">
              <Pencil size={18} />
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="rounded-lg hover:bg-red-50" onClick={() => onDelete(product.id)}>
            <Trash2 size={18} className="text-red-500" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
