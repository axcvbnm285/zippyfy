import BasicInfoSection from "./BasicInfoSection";
import PricingSection from "./PricingSection";
import InventorySection from "./InventorySection";
import OrganizationSection from "./OrganizationSection";
import ImageUploadSection from "./ImageUploadSection";
import ProductSettingsSection from "./ProductSettingsSection";

import { Button } from "@/components/ui/button";

export default function ProductForm() {
  return (
    <div className="space-y-8">

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-8 lg:col-span-2">

          <BasicInfoSection />

          <PricingSection />

          <InventorySection />

        </div>

        {/* Right */}

        <div className="space-y-8">

          <ImageUploadSection />

          <OrganizationSection />

          <ProductSettingsSection />

        </div>

      </div>

      <div className="flex justify-end gap-4 border-t pt-6">

        <Button
          variant="outline"
          size="lg"
        >
          Cancel
        </Button>

        <Button
          size="lg"
        >
          Save Product
        </Button>

      </div>

    </div>
  );
}