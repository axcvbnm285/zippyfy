import { Badge } from "@/components/ui/badge";

type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

interface Props {
  payment: PaymentStatus;
}

export default function PaymentBadge({ payment }: Props) {
  switch (payment) {
    case "PAID":
      return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
    case "PENDING":
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    case "REFUNDED":
      return <Badge className="bg-blue-100 text-blue-600">Refunded</Badge>;
    default:
      return <Badge variant="destructive">Failed</Badge>;
  }
}
