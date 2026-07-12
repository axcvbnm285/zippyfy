import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrganizationSection() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Organization</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="bakery">Bakery</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <Input placeholder="Amul" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Weight
          </label>

          <Input placeholder="500g" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SKU
          </label>

          <Input placeholder="SKU-12345" />
        </div>
      </CardContent>
    </Card>
  );
}