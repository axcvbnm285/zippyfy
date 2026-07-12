import Link from "next/link";
import { ChevronLeft, CheckCircle2, Circle, QrCode } from "lucide-react";
import Navbar from "@/features/home/components/Navbar";
import BottomNavigation from "@/features/home/components/BottomNavigation";
import { orders } from "@/mock/orders";
import { cn } from "@/lib/utils";

const steps = [
  { key: "NEW", label: "Order Placed" },
  { key: "PACKING", label: "Being Packed" },
  { key: "READY", label: "Ready for Pickup" },
  { key: "COLLECTED", label: "Collected" },
];

const statusOrder = ["NEW", "PACKING", "READY", "COLLECTED"];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id) ?? orders[0];
  const currentStep = statusOrder.indexOf(order.status);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-5">
        <Link href="/orders" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-green-600">
          <ChevronLeft size={16} /> Back to Orders
        </Link>

        {/* Header */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-slate-900">{order.id}</p>
            <span className="text-xs text-slate-400">{order.placedAt}</span>
          </div>
          <p className="text-sm text-slate-500">{order.items} items · ₹{order.total}</p>
        </div>

        {/* Pickup code */}
        {order.pickupCode && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <QrCode size={18} />
              <p className="text-sm font-semibold">Your Pickup Code</p>
            </div>
            <p className="text-5xl font-black tracking-widest text-green-700">{order.pickupCode}</p>
            <p className="text-xs text-slate-500">Show this code at the counter to collect your order</p>
          </div>
        )}

        {/* Timeline */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-800">Order Status</h3>
          <div className="space-y-4">
            {steps.map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              return (
                <div key={step.key} className="flex items-center gap-3">
                  {done ? (
                    <CheckCircle2 size={20} className={cn(active ? "text-green-600" : "text-green-400")} />
                  ) : (
                    <Circle size={20} className="text-slate-200" />
                  )}
                  <span className={cn("text-sm font-semibold", done ? (active ? "text-green-700" : "text-slate-600") : "text-slate-300")}>
                    {step.label}
                  </span>
                  {active && <span className="ml-auto text-[10px] font-semibold text-green-600 bg-green-50 rounded-full px-2 py-0.5">Current</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Items */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Items Ordered</h3>
          {order.orderItems.map((item) => (
            <div key={item.name} className="flex justify-between text-sm">
              <span className="text-slate-700">{item.name} <span className="text-slate-400">× {item.qty} {item.unit}</span></span>
              <span className="font-semibold text-slate-900">₹{item.price}</span>
            </div>
          ))}
          <div className="h-px bg-slate-100" />
          <div className="flex justify-between text-sm font-bold text-slate-900">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}
