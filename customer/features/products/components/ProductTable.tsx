"use client";

import ProductRow from "./ProductRow";

interface Props {
  products: any[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, loading, onDelete }: Props) {
  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground">Loading products...</div>;
  if (products.length === 0) return <div className="py-12 text-center text-sm text-muted-foreground">No products yet. Add one above.</div>;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            {["Image", "Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
              <th key={h} className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
