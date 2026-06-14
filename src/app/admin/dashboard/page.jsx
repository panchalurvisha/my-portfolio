import { cookies } from 'next/headers';
import Link from 'next/link';
import { ShieldCheck, Clock, BadgeCheck, Users, Timer } from 'lucide-react';
import LogoutButton from './LogoutButton';

export const metadata = { title: 'Dashboard | Admin' };

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const hasSession = !!cookieStore.get('admin_session');
  const adminId = process.env.ADMIN_ID ?? 'admin';
  const loadedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-white">

      {/* Top nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-zinc-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-semibold text-zinc-900">Admin</span>
        </div>
        <LogoutButton />
      </div>

      <div className="px-8 py-8 max-w-screen-xl mx-auto space-y-8">

        {/* Welcome banner */}
        <div className="bg-zinc-950 rounded-2xl px-7 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Signed in as</p>
            <p className="text-xl font-bold text-white tracking-tight">{adminId}</p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Session active
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BadgeCheck, label: 'Admin ID',   value: adminId,          mono: true },
            { icon: ShieldCheck,label: 'Role',        value: 'Administrator' },
            { icon: Clock,      label: 'Loaded at',  value: loadedAt },
            { icon: Timer,      label: 'Expires',    value: '8 h from login' },
          ].map(({ icon: Icon, label, value, mono }) => (
            <div key={label} className="bg-zinc-50 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Icon className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.75} />
                <p className="text-xs text-zinc-400">{label}</p>
              </div>
              <p className={`text-sm font-semibold text-zinc-900 truncate ${mono ? 'font-mono' : ''}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Pages */}
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Pages</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <Link
              href="/admin/dashboard/visitors"
              className="group bg-zinc-50 hover:bg-zinc-100 rounded-2xl p-5 flex items-center gap-4 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-zinc-600" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-950">Visitors</p>
                <p className="text-xs text-zinc-400 mt-0.5">Device · OS · browser · IP</p>
              </div>
            </Link>

            {/* Future slots */}
            {[1, 2].map((i) => (
              <div key={i} className="bg-zinc-50 rounded-2xl p-5 flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 rounded-xl bg-white border border-dashed border-zinc-300 flex items-center justify-center shrink-0">
                  <span className="text-zinc-400 text-lg leading-none">+</span>
                </div>
                <p className="text-sm text-zinc-400">Coming soon</p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
