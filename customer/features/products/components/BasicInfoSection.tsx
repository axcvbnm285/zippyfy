import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

export default function BasicInfoSection() {
  return (
    <Card className="rounded-3xl">

      <CardHeader>

        <CardTitle>

          Basic Information

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-6">

        <div>

          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <Input placeholder="Apple" />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <Textarea
            rows={5}
            placeholder="Write a product description..."
          />

        </div>

      </CardContent>

    </Card>
  );
}