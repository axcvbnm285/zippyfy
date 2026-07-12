"use client";

import { useState } from "react";
import { Pencil, Trash2, ShoppingBasket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryStatusBadge from "./CategoryStatusBadge";
import CategoryForm from "./CategoryForm";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface Props {
  category: Category;
  onDelete: (id: string) => void;
  onUpdate: (updated: Category) => void;
}

export default function CategoryCard({ category, onDelete, onUpdate }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden rounded-2xl border border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex h-36 items-center justify-center bg-slate-50">
          <ShoppingBasket size={40} className="text-slate-200" />
        </div>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">{category.name}</h3>
            <CategoryStatusBadge active={category.isActive} />
          </div>
          <p className="text-xs text-muted-foreground">/{category.slug}</p>
          <div className="flex justify-end gap-1.5">
            <Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => setEditOpen(true)}>
              <Pencil size={15} />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-red-50" onClick={() => setDeleteOpen(true)}>
              <Trash2 size={15} className="text-red-500" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
          <CategoryForm
            category={category}
            onClose={() => setEditOpen(false)}
            onSaved={(updated) => { onUpdate(updated); setEditOpen(false); }}
          />
        </DialogContent>
      </Dialog>

      <DeleteCategoryDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        categoryName={category.name}
        onConfirm={() => { onDelete(category.id); setDeleteOpen(false); }}
      />
    </>
  );
}
