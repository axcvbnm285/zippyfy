"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductFilters() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
        <Input placeholder="Search products..." className="h-9 pl-9 text-sm" />
      </div>
      <Select>
        <SelectTrigger className="h-9 w-full sm:w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="fruits">Fruits</SelectItem>
          <SelectItem value="dairy">Dairy</SelectItem>
          <SelectItem value="bakery">Bakery</SelectItem>
          <SelectItem value="groceries">Groceries</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="h-9 w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="h-9">Reset</Button>
    </div>
  );
}
