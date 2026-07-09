"use client";

import { products } from "@/components/mock/product";
import ProductRow, { type Product } from "./ProductRow";

export default function ProductTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Image
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Product
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Category
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Price
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Stock
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: Product) => (
            <ProductRow
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}