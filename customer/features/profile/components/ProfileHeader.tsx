import { UserCircle2 } from "lucide-react";
import { profile } from "@/mock/profile";

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-green-50">
        <UserCircle2 size={40} className="text-green-600" />
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900">{profile.name}</p>
        <p className="text-sm text-slate-500">{profile.email}</p>
        <p className="mt-0.5 text-xs text-slate-400">Member since {profile.joinedAt}</p>
      </div>
    </div>
  );
}
