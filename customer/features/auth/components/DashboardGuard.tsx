"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      router.replace("/store/login");
      return;
    }

    if (user.role !== "STORE_OWNER" && user.role !== "ADMIN") {
      router.replace("/store/login");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (user.role !== "STORE_OWNER" && user.role !== "ADMIN")) {
    return null;
  }

  return <>{children}</>;
}
