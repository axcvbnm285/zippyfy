import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed py-20 text-center">
      <FolderOpen
        size={70}
        className="mx-auto text-slate-300"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        No Categories Found
      </h2>

      <p className="mt-2 text-slate-500">
        Create your first category.
      </p>

      <Button className="mt-8">
        Add Category
      </Button>
    </div>
  );
}