"use client";

import { useState, useEffect } from "react";
import CategoryHeader from "@/features/categories/components/CategoryHeader";
import CategorySearch from "@/features/categories/components/CategorySearch";
import CategoryCard from "@/features/categories/components/CategoryCard";
import { getCategories, deleteCategory } from "@/services/category.service";

export default function DashboardCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data)).finally(() => setLoading(false));
  }, []);

  const handleAdded = (cat: any) => setCategories((prev) => [cat, ...prev]);
  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };
  const handleUpdate = (updated: any) => setCategories((prev) => prev.map((c) => c.id === updated.id ? updated : c));

  return (
    <div className="space-y-8">
      <CategoryHeader onAdded={handleAdded} />
      <CategorySearch />
      {loading ? (
        <div className="py-12 text-center text-sm text-muted-foreground">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground">No categories yet. Add one above.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}
