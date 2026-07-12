import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";

export default function ProductSettingsSection() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Product Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">
              Active
            </h4>

            <p className="text-sm text-slate-500">
              Product is visible to customers.
            </p>
          </div>

          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">
              Featured
            </h4>

            <p className="text-sm text-slate-500">
              Display on the home page.
            </p>
          </div>

          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}