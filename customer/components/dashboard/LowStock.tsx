"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const products = [
  { name: "Apple", stock: 4, max: 50 },
  { name: "Milk", stock: 2, max: 30 },
  { name: "Bread", stock: 1, max: 20 },
];

export default function LowStock() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Low Stock</CardTitle>
        <CardDescription>Items that need restocking soon</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {products.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-amber-500" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-xs font-medium text-destructive">
                {item.stock} left
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${(item.stock / item.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
