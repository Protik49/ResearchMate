import React from 'react';
import { Bookmark, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FacultyCard from '../components/FacultyCard';
import Button from '../components/ui/Button';

export default function SavedFacultyPage({ facultyList, onSelectFaculty, onOpenAuth }) {
  const { user, savedFacultyIds } = useAuth();

  const savedList = facultyList.filter((f) => savedFacultyIds.includes(f.id));

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mx-auto mb-6 text-zinc-500 dark:text-zinc-400">
          <Bookmark className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Sign In to Save Faculty</h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed font-normal">
          Create an academic profile to bookmark teachers, follow department announcements, and receive personal exam alerts.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={onOpenAuth}
          className="mt-6 rounded-full"
        >
          Sign In / Create Account
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Page Header */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            <Bookmark className="w-3.5 h-3.5 fill-current text-zinc-900 dark:text-zinc-100" />
            <span>Personal Academic Bookmarks</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Saved Faculty Profiles
          </h1>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {savedList.length} {savedList.length === 1 ? 'profile' : 'profiles'} bookmarked
        </span>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedList.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
              onSelect={onSelectFaculty}
              onRequireAuth={onOpenAuth}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-8 max-w-lg mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <Bookmark className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">No saved teachers yet</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            Browse the faculty directory and click the bookmark icon on any teacher to pin them here for rapid access.
          </p>
        </div>
      )}
    </div>
  );
}
