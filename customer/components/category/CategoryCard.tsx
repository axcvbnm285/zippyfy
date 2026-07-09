"use client";

import { Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import CategoryStatusBadge from "./CategoryStatusBadge";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  products: number;
  active: boolean;
}

interface Props {
  category: Category;
}

export default function CategoryCard({
  category,
}: Props) {
  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={category.image}
        alt={category.name}
        className="h-48 w-full object-cover"
      />

      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {category.name}
          </h3>

          <CategoryStatusBadge
            active={category.active}
          />
        </div>

        <p className="text-sm text-slate-500">
          {category.products} Products
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
          >
            <Pencil size={18} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-red-50"
          >
            <Trash2
              size={18}
              className="text-red-500"
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}