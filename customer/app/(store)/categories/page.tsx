import CategoryHeader from "@/components/category/CategoryHeader";
import CategorySearch from "@/components/category/CategorySearch";
import CategoryGrid from "@/components/category/CategoryGrid";

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <CategoryHeader />

      <CategorySearch />

      <CategoryGrid />
    </div>
  );
}