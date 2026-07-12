import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import AccountInfo from "@/features/profile/components/AccountInfo";
import PaymentMethods from "@/features/profile/components/PaymentMethods";
import SettingsCard from "@/features/profile/components/SettingsCard";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
        <ProfileHeader />
        <AccountInfo />
        <PaymentMethods />
        <SettingsCard />
      </div>
      <BottomNavigation />
    </main>
  );
}
