"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductFilters() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}

      <div className="relative w-full lg:max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          placeholder="Search products..."
          className="pl-10 h-11 rounded-xl"
        />

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        <Select>

          <SelectTrigger className="w-[180px] rounded-xl">

            <SelectValue placeholder="Category" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Categories
            </SelectItem>

            <SelectItem value="fruits">
              Fruits
            </SelectItem>

            <SelectItem value="dairy">
              Dairy
            </SelectItem>

            <SelectItem value="bakery">
              Bakery
            </SelectItem>

            <SelectItem value="groceries">
              Groceries
            </SelectItem>

          </SelectContent>

        </Select>

        <Select>

          <SelectTrigger className="w-[180px] rounded-xl">

            <SelectValue placeholder="Status" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Status
            </SelectItem>

            <SelectItem value="active">
              Active
            </SelectItem>

            <SelectItem value="inactive">
              Inactive
            </SelectItem>

            <SelectItem value="out">
              Out of Stock
            </SelectItem>

          </SelectContent>

        </Select>

        <Button variant="outline" className="rounded-xl">
          Reset
        </Button>

      </div>

    </div>
  );
}