import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default function InventorySection() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Stock
            </label>

            <Input
              type="number"
              placeholder="50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Unit
            </label>

            <Input placeholder="kg / pcs / litre" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}