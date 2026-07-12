import DashboardGuard from "@/features/auth/components/DashboardGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata = { title: "Dashboard — Zippyfy" };

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardGuard>
  );
}
