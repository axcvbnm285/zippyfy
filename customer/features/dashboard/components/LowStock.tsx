"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { getStoreProducts } from "@/services/product.service";

export default function LowStock() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getStoreProducts().then((res) => {
      const low = res.data.filter((p: any) => p.stock <= 10).slice(0, 5);
      setItems(low);
    });
  }, []);

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Fulfillment Risks</CardTitle>
        <CardDescription>Low stock items that can block pickup orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">All products are well stocked.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle size={12} className="text-amber-500" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-destructive">{item.stock} left</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${Math.min((item.stock / 20) * 100, 100)}%` }} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
