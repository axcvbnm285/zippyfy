import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import CartList from "@/features/cart/components/CartList";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Cart</h1>
          <p className="text-sm text-slate-500">Review your items before checkout</p>
        </div>
        <CartList />
      </div>
      <BottomNavigation />
    </main>
  );
}
