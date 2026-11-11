import React, { useEffect, useState } from 'react';
import { X, Bookmark, ExternalLink, Mail, MapPin, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_EXAMS } from '../data/mockData';
import Button from './ui/Button';

export default function FacultyDetailModal({ faculty, onClose, onRequireAuth }) {
  const { savedFacultyIds, toggleSaveFaculty, user } = useAuth();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!faculty) return null;

  const isSaved = savedFacultyIds.includes(faculty.id);

  // Find exams associated with this faculty or department
  const facultyExams = INITIAL_EXAMS.filter(
    (ex) => ex.facultyName === faculty.name || faculty.name.includes(ex.facultyName)
  );

  const handleBookmark = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    toggleSaveFaculty(faculty.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 sm:p-10 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-[0.97] duration-150 text-left"
        style={{ transformOrigin: 'center' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-press"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header section with photo */}
        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 shrink-0">
            {faculty.imageUrl && !imageError ? (
              <img
                src={faculty.imageUrl}
                alt={faculty.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 text-2xl font-bold uppercase">
                {faculty.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {faculty.name}
              </h2>
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-snug">
              {faculty.designation}
            </p>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              {faculty.department}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant={isSaved ? "primary" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="rounded-full flex items-center gap-2"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved in Profile' : 'Save to My Teachers'}</span>
              </Button>

              <a
                href={faculty.profileUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary" size="sm" className="rounded-full flex items-center gap-1.5">
                  <span>Official BRACU Bio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b border-zinc-100 dark:border-zinc-800">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Direct Email
            </span>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{faculty.email || 'faculty@bracu.ac.bd'}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Department Office
            </span>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{faculty.room || 'UB07-CSE Department'}</p>
          </div>
        </div>

        {/* Research Areas */}
        <div className="py-8 border-b border-zinc-100 dark:border-zinc-800 space-y-3">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Academic & Research Focus
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {faculty.researchInterests?.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Associated Exam Schedule */}
        <div className="pt-8 space-y-4">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Course & Invigilation Schedule
          </span>
          {facultyExams.length > 0 ? (
            <div className="space-y-2.5">
              {facultyExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mr-2">{exam.courseCode}</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">{exam.courseTitle}</span>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{exam.section}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{exam.date}</span>
                    <p className="text-[11px] text-zinc-500">{exam.startTime} · {exam.room}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic">
              No immediate exam invigilations assigned for current term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
