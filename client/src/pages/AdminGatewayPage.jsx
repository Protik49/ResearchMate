import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function AdminGatewayPage({ currentUser }) {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('admin@bracu.ac.bd');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const res = await signIn(email, password);
    if (res.success) {
      setSuccessMsg('Authenticated as Administrator. Launching dashboard...');
      setTimeout(() => navigate('/admin'), 400);
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleOneClickAdmin = async () => {
    setErrorMsg('');
    setEmail('admin@bracu.ac.bd');
    setPassword('password123');
    const res = await signIn('admin@bracu.ac.bd', 'password123');
    if (res.success) {
      setSuccessMsg('Signed in as Department Administrator. Launching...');
      setTimeout(() => navigate('/admin'), 300);
    } else {
      setErrorMsg(res.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Card className="p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-900 rounded-3xl">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center shadow-sm">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Department Control Center
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Administrative privilege required to manage faculty rosters, timetables, and academic notices.
            </p>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <UserCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Role Check Banner if already logged in as non-admin */}
          {currentUser && currentUser.role !== 'admin' && (
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <p className="font-medium">
                You are currently signed in as <strong className="font-semibold">{currentUser.fullName || currentUser.email}</strong> with role: <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">{currentUser.role}</code>.
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300">
                Switch to the verified Department Administrator account below to access this page.
              </p>
            </div>
          )}

          {/* One-Click Quick Login CTA */}
          <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 text-center space-y-2.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
              Instant Demo Access
            </span>
            <Button
              type="button"
              variant="primary"
              size="md"
              isLoading={loading}
              onClick={handleOneClickAdmin}
              className="w-full flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Sign In as Demo Admin</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-[11px] text-zinc-400">
              Credentials: <code className="font-mono text-zinc-600 dark:text-zinc-300">admin@bracu.ac.bd</code> / <code className="font-mono text-zinc-600 dark:text-zinc-300">password123</code>
            </p>
          </div>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-zinc-900 text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              Or Manual Sign In
            </span>
          </div>

          {/* Manual Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bracu.ac.bd"
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />

            <Button
              type="submit"
              variant="outline"
              size="md"
              isLoading={loading}
              className="w-full"
            >
              <Lock className="w-4 h-4" />
              <span>Verify & Access Control Center</span>
            </Button>
          </form>

          {/* Back link */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <Link
              to="/"
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              ← Return to Department Homepage
            </Link>
          </div>

        </Card>
      </div>
    </div>
  );
}
