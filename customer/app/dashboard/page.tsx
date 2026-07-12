import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import OperationsCards from "@/features/dashboard/components/OperationsCards";
import QuickActions from "@/features/dashboard/components/QuickActions";
import OperationsBoard from "@/features/dashboard/components/OperationsBoard";
import RecentOrders from "@/features/dashboard/components/RecentOrders";
import LowStock from "@/features/dashboard/components/LowStock";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <OperationsCards />
      <QuickActions />
      <OperationsBoard />
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentOrders />
        <LowStock />
      </div>
    </div>
  );
}
