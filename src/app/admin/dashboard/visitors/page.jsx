import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Globe, AlertCircle, Users,
  TrendingUp, Calendar, Clock, CalendarDays,
} from 'lucide-react';

export const metadata = { title: 'Visitors | Admin' };
export const dynamic = 'force-dynamic';

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const OS_ICONS = {
  'Windows':       `${BASE}/windows11/windows11-original.svg`,
  'Windows Phone': `${BASE}/windows11/windows11-original.svg`,
  'macOS':         `${BASE}/apple/apple-original.svg`,
  'iOS':           `${BASE}/apple/apple-original.svg`,
  'iPadOS':        `${BASE}/apple/apple-original.svg`,
  'Android':       `${BASE}/android/android-original.svg`,
  'Linux':         `${BASE}/linux/linux-original.svg`,
  'ChromeOS':      `${BASE}/chrome/chrome-original.svg`,
};

const BROWSER_ICONS = {
  'Chrome':   `${BASE}/chrome/chrome-original.svg`,
  'Firefox':  `${BASE}/firefox/firefox-original.svg`,
  'Safari':   `${BASE}/safari/safari-original.svg`,
  'Edge':     `${BASE}/edge/edge-original.svg`,
  'Opera':    `${BASE}/opera/opera-original.svg`,
  'Samsung':  `${BASE}/android/android-original.svg`,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function Img({ src, alt, size = 15 }) {
  if (!src) return <Globe style={{ width: size, height: size }} className="text-zinc-300 shrink-0" strokeWidth={1.5} />;
  return <Image src={src} alt={alt} width={size} height={size} unoptimized className="shrink-0" />;
}

function fmt(date) {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

function topEntries(obj) {
  const total = Object.values(obj).reduce((s, n) => s + n, 0);
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key, count]) => ({ key, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 }));
}

// ── Components ────────────────────────────────────────────────────────────────
function PeriodCard({ label, icon: Icon, devices, visits }) {
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" strokeWidth={2} />
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-3xl font-bold text-zinc-900 tabular-nums leading-none">{devices}</p>
          <p className="text-xs text-zinc-400 mt-1.5">devices</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-zinc-400 tabular-nums leading-none">{visits}</p>
          <p className="text-xs text-zinc-400 mt-1.5">visits</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  const colors = {
    violet: 'bg-violet-50 text-violet-600',
    blue:   'bg-blue-50   text-blue-600',
  };
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[accent]}`}>
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-zinc-900 tabular-nums leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function BreakdownRow({ label, iconSrc, count, pct }) {
  return (
    <div className="flex items-center gap-3">
      <Img src={iconSrc} alt={label} size={16} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-sm text-zinc-700 font-medium truncate">{label}</span>
          <span className="text-xs tabular-nums text-zinc-400 shrink-0">{count} · {pct}%</span>
        </div>
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full bg-zinc-800 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function VisitorsPage() {
  let all = [];
  let error = null;

  try {
    all = await (await clientPromise)
      .db('portfolio')
      .collection('visitors')
      // Only project what we actually display
      .find({}, { projection: { os: 1, browser: 1, firstSeenAt: 1, lastSeenAt: 1, visitCount: 1 } })
      .sort({ lastSeenAt: -1 })
      .toArray();
  } catch (e) {
    error = e.message;
  }

  // Time periods (IST)
  const IST_OFF   = 5.5 * 60 * 60 * 1000;
  const todayIST  = new Date(new Date(new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })).getTime() - IST_OFF);
  const week7IST  = new Date(todayIST.getTime() - 6  * 86400000);
  const month30IST= new Date(todayIST.getTime() - 29 * 86400000);

  function period(from) {
    const s = all.filter(v => new Date(v.lastSeenAt ?? v.firstSeenAt) >= from);
    return { devices: s.length, visits: s.reduce((n, v) => n + (v.visitCount ?? 1), 0) };
  }

  const periods = [
    { label: 'Today',        icon: Clock,        ...period(todayIST)    },
    { label: 'Last 7 days',  icon: CalendarDays, ...period(week7IST)    },
    { label: 'Last 30 days', icon: Calendar,     ...period(month30IST)  },
    { label: 'All time',     icon: TrendingUp,   devices: all.length, visits: all.reduce((n, v) => n + (v.visitCount ?? 1), 0) },
  ];

  // Aggregates
  const agg = all.reduce((a, v) => {
    a.os[v.os]            = (a.os[v.os]            ?? 0) + 1;
    a.browsers[v.browser] = (a.browsers[v.browser] ?? 0) + 1;
    return a;
  }, { os: {}, browsers: {} });

  const totalDevices = all.length;
  const totalVisits  = all.reduce((n, v) => n + (v.visitCount ?? 1), 0);
  const table        = all.slice(0, 50);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* Nav */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-zinc-100 px-4 sm:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/dashboard"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition shrink-0"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <Users className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={1.75} />
          <span className="text-sm font-semibold text-zinc-900">Visitors</span>
        </div>
        {error ? (
          <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 border border-red-100 px-2.5 py-1.5 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} /> DB error
          </div>
        ) : (
          <span className="text-xs text-zinc-400">
            <span className="font-semibold text-zinc-700">{totalDevices}</span> devices ·{' '}
            <span className="font-semibold text-zinc-700">{totalVisits}</span> visits
          </span>
        )}
      </div>

      <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-screen-xl mx-auto space-y-8">

        {/* Quick Stats */}
        <section>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">Quick Stats</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {periods.map(p => <PeriodCard key={p.label} {...p} />)}
          </div>
        </section>

        {/* Overview */}
        <section>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">Overview</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatCard label="Unique Devices" value={totalDevices} icon={Users} accent="violet" />
          </div>
        </section>

        {/* Breakdown */}
        <section>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">Breakdown</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: 'Operating System', entries: topEntries(agg.os),       map: OS_ICONS },
              { title: 'Browser',          entries: topEntries(agg.browsers), map: BROWSER_ICONS },
            ].map(({ title, entries, map }) => (
              <div key={title} className="bg-white border border-zinc-100 rounded-2xl p-5 space-y-4">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{title}</p>
                {entries.length === 0
                  ? <p className="text-xs text-zinc-300 py-4 text-center">No data yet</p>
                  : entries.map(({ key, count, pct }) => (
                      <BreakdownRow key={key} label={key} iconSrc={map[key]} count={count} pct={pct} />
                    ))
                }
              </div>
            ))}
          </div>
        </section>

        {/* Visitor Log */}
        <section>
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">Visitor Log</p>
          <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Unique devices</span>
              <span className="text-xs text-zinc-400">{table.length} of {totalDevices}</span>
            </div>

            {table.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-3">
                <Users className="w-8 h-8 text-zinc-200" strokeWidth={1.25} />
                <p className="text-sm text-zinc-300">No visitors yet</p>
              </div>
            ) : (
              <>
                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-zinc-100">
                  {table.map(v => (
                    <div key={v._id.toString()} className="px-4 py-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                          <Img src={OS_ICONS[v.os]} alt={v.os} size={14} />
                          {v.os}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Img src={BROWSER_ICONS[v.browser]} alt={v.browser} size={12} />
                        {v.browser}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {fmt(v.firstSeenAt)} → {fmt(v.lastSeenAt)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        {['First seen', 'Last seen', 'Visits', 'OS', 'Browser'].map(h => (
                          <th key={h} className="text-left px-6 py-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((v, i) => (
                        <tr
                          key={v._id.toString()}
                          className={`border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors ${i % 2 !== 0 ? 'bg-zinc-50/30' : ''}`}
                        >
                          <td className="px-6 py-4 text-xs text-zinc-600 whitespace-nowrap font-medium">{fmt(v.firstSeenAt)}</td>
                          <td className="px-6 py-4 text-xs text-zinc-400 whitespace-nowrap">{fmt(v.lastSeenAt)}</td>
                          <td className="px-6 py-4">
                            <span className="bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums">
                              {v.visitCount ?? 1}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 text-xs text-zinc-700 whitespace-nowrap">
                              <Img src={OS_ICONS[v.os]} alt={v.os} size={14} />
                              {v.os}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 text-xs text-zinc-700 whitespace-nowrap">
                              <Img src={BROWSER_ICONS[v.browser]} alt={v.browser} size={14} />
                              {v.browser}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
