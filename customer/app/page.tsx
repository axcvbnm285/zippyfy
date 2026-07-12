import Navbar from "@/features/home/components/Navbar";
import Hero from "@/features/home/components/Hero";
import SearchBar from "@/features/home/components/SearchBar";
import StoreBanner from "@/features/home/components/StoreBanner";
import CategorySection from "@/features/home/components/CategorySection";
import PopularProducts from "@/features/home/components/PopularProducts";
import FeaturedProducts from "@/features/home/components/FeaturedProducts";
import PickupInfo from "@/features/home/components/PickupInfo";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import ViewCartBar from "@/features/cart/components/ViewCartBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <Hero />
        <SearchBar />
        <StoreBanner />
        <CategorySection />
        <PopularProducts />
        <FeaturedProducts />
        <PickupInfo />
      </div>
      <ViewCartBar />
      <BottomNavigation />
    </main>
  );
}
