import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function ProductStatusBadge({
  status,
}: Props) {
  if (status === "Active") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        Active
      </Badge>
    );
  }

  if (status === "Inactive") {
    return (
      <Badge variant="secondary">
        Inactive
      </Badge>
    );
  }

  return (
    <Badge variant="destructive">
      Out of Stock
    </Badge>
  );
}