import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UploadCloud } from "lucide-react";

export default function ImageUploadSection() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Product Image</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition hover:border-green-500 hover:bg-green-50">
          <UploadCloud
            size={50}
            className="text-slate-400"
          />

          <p className="mt-4 font-medium">
            Click to upload image
          </p>

          <p className="mt-1 text-sm text-slate-500">
            PNG, JPG, WEBP (Max 5 MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}