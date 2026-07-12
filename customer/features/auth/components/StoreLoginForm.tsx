"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Store, Loader2 } from "lucide-react";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

export default function StoreLoginForm() {
  const router = useRouter();
  const loginStore = useAuthStore((s) => s.login);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }

    setLoading(true);
    try {
      const res = await login(form);
      const user = res.data.user;

      if (user.role !== "STORE_OWNER" && user.role !== "ADMIN") {
        setError("This portal is for store owners only. Please use the customer login.");
        return;
      }

      loginStore(user, res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
            <Store size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Store Portal</h1>
          <p className="text-sm text-slate-400">Sign in to manage your Zippyfy store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="store@example.com"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-60">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In to Store"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Customer?{" "}
          <a href="/login" className="text-slate-400 hover:underline">Go to customer login →</a>
        </p>
        <p className="mt-2 text-center text-xs text-slate-600">
          New store?{" "}
          <a href="/store/register" className="text-slate-400 hover:underline">Register your store →</a>
        </p>
      </div>
    </div>
  );
}
