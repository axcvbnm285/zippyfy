"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, growth, icon }: StatsCardProps) {
  const isPositive = growth.startsWith("+");

  return (
    <Card className="bg-background transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-emerald-600" : "text-destructive"
            )}
          >
            <TrendingUp size={12} />
            {growth}
          </span>
        </div>

        <p className="mt-4 text-xs font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
