import DashboardLayout from "@/components/layout/DashboardLayout";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}