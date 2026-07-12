import OrderHeader from "@/features/orders/components/OrderHeader";
import OrderFilters from "@/features/orders/components/OrderFilters";
import OrdersKanban from "@/features/orders/components/OrdersKanban";

export default function DashboardOrdersPage() {
  return (
    <div className="space-y-6">
      <OrderHeader />
      <OrderFilters />
      <OrdersKanban />
    </div>
  );
}
