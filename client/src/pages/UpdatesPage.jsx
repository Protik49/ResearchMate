import React, { useState } from 'react';
import { Bell, Plus, Calendar, Tag, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function UpdatesPage({ updatesList, onAddUpdate, facultyList, onOpenAuth }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [selectedFacultyId, setSelectedFacultyId] = useState(facultyList[0]?.id || '');

  const filteredUpdates = updatesList.filter(
    (u) => filter === 'all' || u.category === filter
  );

  const handlePost = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const faculty = facultyList.find((f) => f.id === selectedFacultyId);

    const newPost = {
      id: 'upd-' + Date.now(),
      facultyId: selectedFacultyId,
      facultyName: faculty ? faculty.name : user?.fullName || 'Department Notice',
      title,
      content,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '1 min read'
    };

    onAddUpdate(newPost);
    setTitle('');
    setContent('');
    setShowNewModal(false);
  };

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'urgent':
        return 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
      case 'academic':
        return 'bg-zinc-100 text-zinc-700 border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 text-left">
      {/* Page Header */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <Bell className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
            <span>Official Notices & Announcements</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Faculty Updates
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowNewModal(true)}
              className="rounded-full flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Post Update</span>
            </Button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline"
            >
              Sign in to post updates
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2">
        {['all', 'urgent', 'academic', 'general'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs capitalize font-medium transition-all btn-press ${
              filter === cat
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Updates Timeline List */}
      <div className="space-y-6">
        {filteredUpdates.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-7 sm:p-8 card-hover shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getCategoryBadge(
                  item.category
                )}`}
              >
                {item.category}
              </span>
              <span className="text-xs text-zinc-400 font-medium">{item.date}</span>
            </div>

            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
              {item.title}
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-normal">
              {item.content}
            </p>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">By {item.facultyName}</span>
              <span className="text-zinc-400">{item.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      {/* New Notice Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 animate-in fade-in zoom-in-[0.97] duration-150">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Post Faculty Update</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-normal">Broadcast an announcement to students and researchers.</p>

            <form onSubmit={handlePost} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Posting As Faculty</label>
                <select
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
                >
                  {facultyList.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
                >
                  <option value="general">General</option>
                  <option value="academic">Academic / Research</option>
                  <option value="urgent">Urgent Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Makeup Class Schedule for CSE321"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Details</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write clear instructions for students..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setShowNewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                >
                  Publish Notice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
