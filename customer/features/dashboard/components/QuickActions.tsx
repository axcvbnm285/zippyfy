import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingBag, Package, ScanLine } from "lucide-react";

const actions = [
  { label: "View Orders",     icon: ShoppingBag, href: "/dashboard/orders",   variant: "default" as const },
  { label: "Manage Products", icon: Package,     href: "/dashboard/products", variant: "outline" as const },
  { label: "Verify Pickup",   icon: ScanLine,    href: "/dashboard/pickup",   variant: "outline" as const },
];

export default function QuickActions() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump to key operations</CardDescription>
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
