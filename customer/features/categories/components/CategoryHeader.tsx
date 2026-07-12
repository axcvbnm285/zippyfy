"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";

interface Props {
  onAdded: (category: any) => void;
}

export default function CategoryHeader({ onAdded }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Categories</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage your product categories.</p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus size={15} />
          Add Category
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <CategoryForm
            onClose={() => setOpen(false)}
            onSaved={(cat) => { onAdded(cat); setOpen(false); }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
