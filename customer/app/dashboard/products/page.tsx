"use client";

import { useState, useEffect } from "react";
import ProductHeader from "@/features/products/components/ProductHeader";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductTable from "@/features/products/components/ProductTable";
import { getStoreProducts, deleteProduct } from "@/services/product.service";

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStoreProducts().then((res) => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <ProductHeader />
      <ProductFilters />
      <ProductTable products={products} loading={loading} onDelete={handleDelete} />
    </div>
  );
}
