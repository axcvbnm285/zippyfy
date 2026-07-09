"use client";

import { categories } from "@/components/mock/categories";
import CategoryCard from "./CategoryCard";

export default function CategoryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}