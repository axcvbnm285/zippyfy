import { Badge } from "@/components/ui/badge";

interface Props {
  active: boolean;
}

export default function CategoryStatusBadge({
  active,
}: Props) {
  if (active) {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      Inactive
    </Badge>
  );
}