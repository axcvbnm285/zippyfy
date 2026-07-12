"use client";

import {
  Clock3,
  MapPin,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { store } from "@/mock/stores";

export default function PickupBanner() {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="space-y-4 p-5">

        <div className="flex items-center gap-2 text-green-700">
          <MapPin size={18} />

          <span className="font-semibold">
            Pickup Store
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {store.name}
          </h2>

          <p className="text-sm text-slate-600">
            {store.location}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3">
          <Clock3
            size={18}
            className="text-green-600"
          />

          <span className="font-medium">
            Ready in {store.estimatedPickup}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}