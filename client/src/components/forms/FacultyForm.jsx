import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { API_BASE } from '../../lib/api';

export default function FacultyForm({ initialData = null, onSuccess, onCancel }) {
  const isEdit = Boolean(initialData?.id);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    designation: initialData?.designation || '',
    imageUrl: initialData?.imageUrl || '',
    profileUrl: initialData?.profileUrl || '',
    researchInterests: (initialData?.researchInterests || []).join(', '),
    bio: initialData?.bio || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Faculty name is required.';
    if (!formData.designation.trim()) errs.designation = 'Designation/Rank is required.';
    if (!formData.profileUrl.trim()) errs.profileUrl = 'Official bio URL is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validate()) return;

    setLoading(true);
    const payload = {
      name: formData.name.trim(),
      designation: formData.designation.trim(),
      imageUrl: formData.imageUrl.trim() || 'https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/12/24/Male_dummy_0.jpg',
      profileUrl: formData.profileUrl.trim(),
      researchInterests: formData.researchInterests.split(',').map(s => s.trim()).filter(Boolean),
      bio: formData.bio.trim()
    };

    try {
      const url = isEdit ? `${API_BASE}/api/faculty/${initialData.id}` : `${API_BASE}/api/faculty`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-admin-token'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess && onSuccess(payload);
      } else {
        const d = await res.json();
        setErrorMsg(d.error || 'Failed to save faculty record.');
      }
    } catch (err) {
      setErrorMsg('Server communication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs">
          {errorMsg}
        </div>
      )}

      <Input
        label="Faculty Full Name & Degrees"
        value={formData.name}
        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
        placeholder="e.g. Mahbubul Alam Majumdar, PhD"
        error={errors.name}
      />

      <Input
        label="Academic Designation / Rank"
        value={formData.designation}
        onChange={(e) => setFormData(p => ({ ...p, designation: e.target.value }))}
        placeholder="e.g. Professor and Dean"
        error={errors.designation}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Profile Photo URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
          placeholder="https://www.bracu.ac.bd/..."
        />

        <Input
          label="Official BRACU Bio URL"
          value={formData.profileUrl}
          onChange={(e) => setFormData(p => ({ ...p, profileUrl: e.target.value }))}
          placeholder="https://www.bracu.ac.bd/about/people/..."
          error={errors.profileUrl}
        />
      </div>

      <Input
        label="Research Interests (Comma separated)"
        value={formData.researchInterests}
        onChange={(e) => setFormData(p => ({ ...p, researchInterests: e.target.value }))}
        placeholder="Quantum Computing, High Performance Systems, Machine Learning"
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Faculty Biography / Research Summary
        </label>
        <textarea
          rows={3}
          value={formData.bio}
          onChange={(e) => setFormData(p => ({ ...p, bio: e.target.value }))}
          placeholder="Summary of research achievements and lab leadership..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
        />
      </div>

      <div className="pt-2 flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="md" isLoading={loading}>
          {isEdit ? 'Save Changes' : 'Create Faculty Member'}
        </Button>
      </div>
    </form>
  );
}
