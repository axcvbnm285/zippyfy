"use client";

import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "@/services/category.service";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdate = (updated: any) => {
    setCategories((prev) => prev.map((c) => c.id === updated.id ? updated : c));
  };

  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground">Loading categories...</div>;
  if (categories.length === 0) return <div className="py-12 text-center text-sm text-muted-foreground">No categories yet. Add one above.</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
