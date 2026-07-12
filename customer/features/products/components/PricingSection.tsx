import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default function PricingSection() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              MRP
            </label>

            <Input
              type="number"
              placeholder="120"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Selling Price
            </label>

            <Input
              type="number"
              placeholder="95"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}