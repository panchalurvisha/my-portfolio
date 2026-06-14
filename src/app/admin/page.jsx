'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">

        {/* Logo mark */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-950 mb-5">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-950">Welcome back</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in to your admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ID */}
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" strokeWidth={1.75} />
            <input
              id="id"
              type="text"
              autoComplete="username"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Admin ID"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" strokeWidth={1.75} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword
                ? <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                : <Eye className="w-4 h-4" strokeWidth={1.75} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 px-1">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-950 text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition mt-1"
          >
            <LogIn className="w-4 h-4" strokeWidth={1.75} />
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
