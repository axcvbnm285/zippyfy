"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategories } from "@/services/category.service";
import { createProduct } from "@/services/product.service";

export default function ProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", description: "", brand: "", weight: "", sku: "",
    mrp: "", sellingPrice: "", stock: "", unit: "pcs",
    categoryId: "", isActive: true, isFeatured: false,
  });

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const set = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mrp || !form.sellingPrice || !form.stock || !form.categoryId) {
      setError("Please fill in all required fields."); return;
    }
    setLoading(true);
    try {
      await createProduct({
        name: form.name,
        description: form.description || undefined,
        brand: form.brand || undefined,
        weight: form.weight || undefined,
        sku: form.sku || undefined,
        mrp: Number(form.mrp),
        sellingPrice: Number(form.sellingPrice),
        stock: Number(form.stock),
        unit: form.unit,
        categoryId: form.categoryId,
        isActive: form.isActive,
        isFeatured: form.isFeatured,
      });
      router.push("/dashboard/products");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card className="rounded-3xl">
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Product Name *</label>
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Apple" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <Textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Write a product description..." />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">MRP *</label>
                  <Input type="number" value={form.mrp} onChange={(e) => set("mrp", e.target.value)} placeholder="120" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Selling Price *</label>
                  <Input type="number" value={form.sellingPrice} onChange={(e) => set("sellingPrice", e.target.value)} placeholder="95" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader><CardTitle>Inventory</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Stock *</label>
                  <Input type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="50" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Unit *</label>
                  <Input value={form.unit} onChange={(e) => set("unit", e.target.value)} placeholder="kg / pcs / litre" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-3xl">
            <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Category *</label>
                <Select value={form.categoryId} onValueChange={(v) => set("categoryId", v)}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Brand</label>
                <Input value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Amul" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Weight</label>
                <Input value={form.weight} onChange={(e) => set("weight", e.target.value)} placeholder="500g" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">SKU</label>
                <Input value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="SKU-12345" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader><CardTitle>Product Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Active</h4>
                  <p className="text-sm text-slate-500">Visible to customers.</p>
                </div>
                <Switch checked={form.isActive} onCheckedChange={(v) => set("isActive", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Featured</h4>
                  <p className="text-sm text-slate-500">Display on the home page.</p>
                </div>
                <Switch checked={form.isFeatured} onCheckedChange={(v) => set("isFeatured", v)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-4 border-t pt-6">
        <Button type="button" variant="outline" size="lg" onClick={() => router.push("/dashboard/products")}>Cancel</Button>
        <Button type="submit" size="lg" disabled={loading}>
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
