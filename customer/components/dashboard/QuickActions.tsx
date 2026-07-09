import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FolderPlus, ShoppingCart } from "lucide-react";

const actions = [
  { label: "Add Product", icon: Plus, href: "/products/add", variant: "default" as const },
  { label: "Add Category", icon: FolderPlus, href: "/categories", variant: "outline" as const },
  { label: "View Orders", icon: ShoppingCart, href: "/orders", variant: "outline" as const },
];

export default function QuickActions() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks at a glance</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {actions.map(({ label, icon: Icon, href, variant }) => (
          <Button key={label} variant={variant} size="sm" render={<Link href={href} />}>
            <Icon size={14} />
            {label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
