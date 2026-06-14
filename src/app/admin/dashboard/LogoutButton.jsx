'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-red-500 bg-zinc-50 hover:bg-red-50 border border-zinc-200 hover:border-red-200 px-3 py-1.5 rounded-lg disabled:opacity-40 transition"
    >
      {loading
        ? <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
        : <LogOut className="w-3.5 h-3.5" strokeWidth={2} />}
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  );
}
