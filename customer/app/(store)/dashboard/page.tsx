import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import QuickActions from "@/components/dashboard/QuickActions";
import LowStock from "@/components/dashboard/LowStock";
import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";

const stats = [
  { title: "Revenue", value: "₹52,300", growth: "+18%", icon: <DollarSign size={16} /> },
  { title: "Orders", value: "124", growth: "+12%", icon: <ShoppingBag size={16} /> },
  { title: "Products", value: "86", growth: "+8%", icon: <Package size={16} /> },
  { title: "Customers", value: "542", growth: "+15%", icon: <Users size={16} /> },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentOrders />
        <LowStock />
      </div>
    </div>
  );
}
