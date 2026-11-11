import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Your name is required.';
    if (!formData.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim()) errs.message = 'Please provide details in your message.';
    else if (formData.message.trim().length < 15) errs.message = 'Message must be at least 15 characters.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setServerMsg({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setServerMsg({ type: 'error', text: data.error || 'Failed to submit contact request.' });
      }
    } catch (err) {
      setServerMsg({ type: 'error', text: 'Server is currently offline. Please try again shortly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {serverMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            serverMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300'
          }`}
        >
          {serverMsg.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          name="name"
          value={formData.name}
          onChange={(e) => { setFormData(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
          placeholder="e.g. Tanvir Hasan"
          error={errors.name}
          disabled={loading}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => { setFormData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
          placeholder="tanvir@g.bracu.ac.bd"
          error={errors.email}
          disabled={loading}
        />
      </div>

      <Input
        label="Advising Topic / Subject"
        name="subject"
        value={formData.subject}
        onChange={(e) => { setFormData(p => ({ ...p, subject: e.target.value })); setErrors(p => ({ ...p, subject: '' })); }}
        placeholder="e.g. Thesis Supervisor Consultation Request"
        error={errors.subject}
        disabled={loading}
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Message & Inquiry Details
        </label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => { setFormData(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
          placeholder="Explain your research interest, consultation questions, or advising requirements..."
          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all ${
            errors.message
              ? 'border-rose-400 focus:ring-rose-500/20'
              : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100'
          }`}
          disabled={loading}
        />
        {errors.message && (
          <p className="text-[11px] text-rose-600 font-medium">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={loading}
        className="w-full sm:w-auto"
      >
        Submit Academic Inquiry
      </Button>
    </form>
  );
}
