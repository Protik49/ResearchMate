import React, { useState } from 'react';
import { Bookmark, MapPin, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Badge from './ui/Badge';

export default function FacultyCard({ faculty, onSelect, onRequireAuth }) {
  const { savedFacultyIds, toggleSaveFaculty, user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const isSaved = savedFacultyIds.includes(faculty.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!user) {
      onRequireAuth();
      return;
    }
    toggleSaveFaculty(faculty.id);
  };

  return (
    <div
      onClick={() => onSelect(faculty)}
      className="group relative h-[420px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] select-none text-left"
    >
      <div>
        {/* Header: Photo & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 shrink-0">
            {faculty.imageUrl && !imageError ? (
              <img
                src={faculty.imageUrl}
                alt={faculty.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-lg bg-zinc-100 dark:bg-zinc-800">
                {faculty.name.charAt(0)}
              </div>
            )}
          </div>

          <button
            onClick={handleBookmark}
            title={isSaved ? "Remove bookmark" : "Save teacher profile"}
            className={`p-2 rounded-full border transition-all duration-150 btn-press ${
              isSaved
                ? 'bg-zinc-900 border-zinc-900 dark:bg-white dark:border-white text-white dark:text-zinc-900'
                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Designation */}
        <div className="space-y-1.5 mb-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
            {faculty.name}
          </h3>
          <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-snug">
            {faculty.designation}
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
            {faculty.department || 'Computer Science & Engineering'}
          </p>
        </div>

        {/* Short description / Bio snippet */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed font-normal">
          {faculty.bio || 'Faculty researcher advising undergraduate thesis and leading computing laboratories.'}
        </p>

        {/* Research pills */}
        {faculty.researchInterests && faculty.researchInterests.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {faculty.researchInterests.slice(0, 2).map((item, idx) => (
              <Badge key={idx} variant="neutral" size="sm">
                {item}
              </Badge>
            ))}
            {faculty.researchInterests.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 text-zinc-500 dark:text-zinc-400 font-medium">
                +{faculty.researchInterests.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="truncate max-w-[100px]">{faculty.room || 'UB07-CSE'}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900"
          onClick={() => onSelect(faculty)}
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
