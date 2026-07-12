import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import NotificationList from "@/features/notifications/components/NotificationList";

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated on your orders</p>
        </div>
        <NotificationList />
      </div>
      <BottomNavigation />
    </main>
  );
}
