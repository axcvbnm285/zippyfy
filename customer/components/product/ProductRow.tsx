"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductStatusBadge from "./ProductStatusBadge";

export interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  return (
    <tr className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50">
      <td className="px-6 py-4">
        {/* Replace with next/image later if desired */}
        <img
          src={product.image}
          alt={product.name}
          className="h-14 w-14 rounded-xl object-cover"
        />
      </td>

      <td className="px-6 py-4 font-semibold text-slate-800">
        {product.name}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {product.category}
      </td>

      <td className="px-6 py-4 font-medium">
        ₹{product.price}
      </td>

      <td className="px-6 py-4">
        {product.stock}
      </td>

      <td className="px-6 py-4">
        <ProductStatusBadge status={product.status} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-lg hover:bg-slate-100"
          >
            <Pencil size={18} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-lg hover:bg-red-50"
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </Button>
        </div>
      </td>
    </tr>
  );
}