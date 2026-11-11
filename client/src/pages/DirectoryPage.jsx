import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Users, Sparkles, BookOpen } from 'lucide-react';
import FacultyCard from '../components/FacultyCard';

export default function DirectoryPage({ facultyList, onSelectFaculty, onRequireAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('All');

  const designations = ['All', 'Professor', 'Associate Professor', 'Assistant Professor', 'Senior Lecturer'];

  const filteredFaculty = useMemo(() => {
    return facultyList.filter((faculty) => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.researchInterests?.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDesignation =
        selectedDesignation === 'All'
          ? true
          : faculty.designation.toLowerCase().includes(selectedDesignation.toLowerCase());

      return matchesSearch && matchesDesignation;
    });
  }, [facultyList, searchQuery, selectedDesignation]);

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section with Generous Whitespace */}
      <section className="pt-12 sm:pt-16 pb-6 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-600 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
          <span>BRAC University · Computer Science & Engineering</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
          Connect with Faculty, Mentors & Researchers
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed">
          Explore CSE faculty members, schedule consultations, view exam invigilations, and stay up to date with department notices.
        </p>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by faculty name, designation, or research area..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {designations.map((desig) => {
            const isActive = selectedDesignation === desig;
            return (
              <button
                key={desig}
                onClick={() => setSelectedDesignation(desig)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 btn-press ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white border border-zinc-200/80 text-zinc-600 hover:border-zinc-300'
                }`}
              >
                {desig}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid Stats Strip */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-200/60 pb-4">
        <span>Showing <strong className="text-zinc-900 font-semibold">{filteredFaculty.length}</strong> of {facultyList.length} faculty members</span>
        <span className="hidden sm:inline">Click any profile card for complete office & exam details</span>
      </div>

      {/* Faculty Cards Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredFaculty.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                onSelect={onSelectFaculty}
                onRequireAuth={onRequireAuth}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-zinc-200/80 p-8 max-w-lg mx-auto">
            <Users className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-zinc-800">No faculty members found</h3>
            <p className="text-xs text-zinc-500 mt-1">Try relaxing your search terms or filter selection.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDesignation('All');
              }}
              className="mt-4 px-4 py-2 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
