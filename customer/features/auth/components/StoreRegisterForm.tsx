"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Store, Loader2 } from "lucide-react";
import { registerStore } from "@/services/auth.service";

export default function StoreRegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", password: "",
    storeName: "", storeAddress: "", storePhone: "",
    openTime: "09:00", closeTime: "21:00",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, storeName, storeAddress, storePhone, openTime, closeTime } = form;
    if (!name || !email || !password || !storeName || !storeAddress || !storePhone) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    try {
      await registerStore({ name, email, password, storeName, storeAddress, storePhone, openTime, closeTime });
      router.push("/store/login?registered=1");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md">

        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
            <Store size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Register your store</h1>
          <p className="text-sm text-slate-400">Set up your Zippyfy store account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Your Details</p>

            <div>
              <label className={labelClass}>Full Name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@store.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Min. 8 characters" className={`${inputClass} pr-11`} />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Store Details */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Store Details</p>

            <div>
              <label className={labelClass}>Store Name</label>
              <input name="storeName" type="text" value={form.storeName} onChange={handleChange} placeholder="e.g. Fresh Mart Kathmandu" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input name="storeAddress" type="text" value={form.storeAddress} onChange={handleChange} placeholder="e.g. Thamel, Kathmandu" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="storePhone" type="tel" value={form.storePhone} onChange={handleChange} placeholder="+977 98XXXXXXXX" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Opens at</label>
                <input name="openTime" type="time" value={form.openTime} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Closes at</label>
                <input name="closeTime" type="time" value={form.closeTime} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-60">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Creating store..." : "Create Store Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/store/login" className="text-slate-300 hover:underline">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
