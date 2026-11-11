import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email is required.';

    if (!password) errs.password = 'Password is required.';
    else if (password.length < 6) errs.password = 'Must be at least 6 characters.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');

    if (!validate()) return;

    const res = await signUp(email, password, fullName, role);
    if (res.success) {
      const userRole = res.user?.role || role;
      setSuccessMsg(
        userRole === 'admin'
          ? 'Admin account created and verified! Redirecting to Admin Dashboard...'
          : 'Account created and verified! Redirecting...'
      );
      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    } else {
      setServerError(res.error || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {serverError && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
          {serverError}
        </div>
      )}
      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{successMsg}</span>
        </div>
      )}

      <Input
        label="Full Name"
        name="fullName"
        value={fullName}
        onChange={(e) => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: '' })); }}
        placeholder="e.g. Mahir Faysal"
        error={errors.fullName}
        disabled={loading}
      />

      <Input
        label="University Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
        placeholder="student@g.bracu.ac.bd"
        error={errors.email}
        disabled={loading}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
        placeholder="•••••••• (min 6 characters)"
        error={errors.password}
        disabled={loading}
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Academic Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
        >
          <option value="student">Student / Researcher</option>
          <option value="faculty">Faculty Member</option>
          <option value="admin">Department Administrator (Admin Access)</option>
        </select>
        <p className="text-[11px] text-zinc-400">
          {role === 'admin'
            ? 'Grants access to Admin Control Center (/admin), faculty CRUD, and analytics.'
            : 'Access to research profiles, saved faculty, and customized exam schedule.'}
        </p>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={loading}
        className="w-full mt-2"
      >
        Create Account & Sign In
      </Button>

      <p className="text-center text-xs text-zinc-500 pt-2">
        Already registered?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-zinc-900 dark:text-zinc-100 font-semibold hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
