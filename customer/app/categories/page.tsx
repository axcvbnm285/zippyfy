import Link from "next/link";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";

const categories = [
  { label: "Fruits",      emoji: "🍎", slug: "fruits",      count: 12 },
  { label: "Vegetables",  emoji: "🥦", slug: "vegetables",  count: 18 },
  { label: "Dairy",       emoji: "🥛", slug: "dairy",       count: 9 },
  { label: "Bakery",      emoji: "🍞", slug: "bakery",      count: 7 },
  { label: "Grains",      emoji: "🌾", slug: "grains",      count: 11 },
  { label: "Beverages",   emoji: "🧃", slug: "beverages",   count: 14 },
  { label: "Snacks",      emoji: "🍿", slug: "snacks",      count: 20 },
  { label: "Essentials",  emoji: "🧴", slug: "essentials",  count: 16 },
  { label: "Oils",        emoji: "🫙", slug: "oils",        count: 6 },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">All Categories</h1>
          <p className="text-sm text-slate-500">Browse by category</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(({ label, emoji, slug, count }) => (
            <Link
              key={slug}
              href={`/products?category=${slug}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
            >
              <span className="text-4xl">{emoji}</span>
              <div>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{count} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}
