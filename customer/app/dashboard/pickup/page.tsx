import PickupVerificationPanel from "@/features/pickup/components/PickupVerificationPanel";

export default function DashboardPickupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Pickup Verification</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Match customer pickup codes to ready orders before handover.
        </p>
      </div>
      <PickupVerificationPanel />
    </div>
  );
}
