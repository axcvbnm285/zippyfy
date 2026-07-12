"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createCategory, updateCategory } from "@/services/category.service";
import { Loader2 } from "lucide-react";

interface Props {
  category?: { id: string; name: string; isActive: boolean };
  onClose: () => void;
  onSaved: (category: any) => void;
}

export default function CategoryForm({ category, onClose, onSaved }: Props) {
  const [name, setName] = useState(category?.name ?? "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required."); return; }
    setLoading(true);
    try {
      let res;
      if (category) {
        res = await updateCategory(category.id, { name, isActive });
      } else {
        res = await createCategory({ name, isActive });
      }
      onSaved(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Category Name</label>
        <Input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} placeholder="e.g. Dairy" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Active</p>
          <p className="text-xs text-muted-foreground">Visible to customers</p>
        </div>
        <Switch checked={isActive} onCheckedChange={setIsActive} />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button type="submit" size="sm" disabled={loading}>
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Saving..." : "Save Category"}
        </Button>
      </div>
    </form>
  );
}
