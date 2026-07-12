import { Badge } from "@/components/ui/badge";

type OrderStatus = "NEW" | "PACKING" | "READY" | "COLLECTED" | "REJECTED";

interface Props {
  status: OrderStatus;
}

const config: Record<OrderStatus, string> = {
  NEW:       "bg-orange-100 text-orange-600",
  PACKING:   "bg-blue-100 text-blue-600",
  READY:     "bg-violet-100 text-violet-600",
  COLLECTED: "bg-emerald-100 text-emerald-600",
  REJECTED:  "bg-red-100 text-red-500",
};

export default function OrderStatusBadge({ status }: Props) {
  return (
    <Badge className={config[status] ?? "bg-muted text-muted-foreground"}>
      {status}
    </Badge>
  );
}
