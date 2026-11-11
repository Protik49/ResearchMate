import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function ProfileUpdateForm() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    setTimeout(() => {
      setLoading(false);
      setStatus({ type: 'success', text: 'Academic profile details updated successfully.' });
    }, 500);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6 text-left max-w-lg">
      {status && (
        <div
          className={`p-3.5 rounded-xl border text-xs ${
            status.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {status.text}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Personal Information
        </h3>

        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          disabled={loading}
        />

        <Input
          label="University Email (Read-only)"
          value={email}
          disabled
          helperText="Verified student/faculty institution email."
        />

        <Input
          label="Avatar Image URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://..."
          disabled={loading}
        />
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Security & Password Change
        </h3>

        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="••••••••"
          helperText="Minimum 8 characters with numbers."
        />
      </div>

      <Button type="submit" variant="primary" size="md" isLoading={loading}>
        Save Profile Updates
      </Button>
    </form>
  );
}
