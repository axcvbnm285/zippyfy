import { PackageCheck, Clock, ShieldCheck, Smartphone } from "lucide-react";

const perks = [
  { icon: Clock,        title: "Ready Before You Arrive",  desc: "We pack your order so it's waiting when you get here." },
  { icon: PackageCheck, title: "No Waiting in Line",       desc: "Skip the queue. Walk in, show your code, walk out." },
  { icon: ShieldCheck,  title: "Verified Pickup",          desc: "Secure pickup code ensures only you collect your order." },
  { icon: Smartphone,   title: "Order From Anywhere",      desc: "Place your order from home, office or on the go." },
];

export default function PickupInfo() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-bold text-slate-800">Why Choose Zippyfy?</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {perks.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <Icon size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{title}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
