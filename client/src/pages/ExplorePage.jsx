import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import FacultyCard from '../components/FacultyCard';
import SkeletonCard from '../components/SkeletonCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function ExplorePage({ facultyList, isLoading, onSelectFaculty, onRequireAuth }) {
  const [search, setSearch] = useState('');
  const [designationFilter, setDesignationFilter] = useState('all');
  const [researchFilter, setResearchFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows of 4 cards on desktop

  // Extract all distinct research interests for filter
  const researchDomains = useMemo(() => {
    const set = new Set();
    facultyList.forEach((f) => {
      (f.researchInterests || []).forEach((r) => set.add(r));
    });
    return Array.from(set).sort();
  }, [facultyList]);

  // Filtering & Sorting
  const filteredAndSorted = useMemo(() => {
    let result = facultyList.filter((f) => {
      const q = search.toLowerCase();
      const matchesSearch =
        f.name.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        (f.researchInterests || []).some(r => r.toLowerCase().includes(q));

      const matchesDesignation =
        designationFilter === 'all'
          ? true
          : f.designation.toLowerCase().includes(designationFilter.toLowerCase());

      const matchesResearch =
        researchFilter === 'all'
          ? true
          : (f.researchInterests || []).some(r => r.toLowerCase() === researchFilter.toLowerCase());

      return matchesSearch && matchesDesignation && matchesResearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'rank') {
        const getRank = (desig) => {
          if (desig.includes('Distinguished')) return 1;
          if (desig.includes('Dean')) return 2;
          if (desig.includes('Chairperson')) return 3;
          if (desig.includes('Professor') && !desig.includes('Associate') && !desig.includes('Assistant')) return 4;
          if (desig.includes('Associate')) return 5;
          if (desig.includes('Assistant')) return 6;
          return 7;
        };
        return getRank(a.designation) - getRank(b.designation);
      }
      return 0;
    });

    return result;
  }, [facultyList, search, designationFilter, researchFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(start, start + itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  const handleReset = () => {
    setSearch('');
    setDesignationFilter('all');
    setResearchFilter('all');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      {/* Page Title */}
      <div className="space-y-1">
        <Badge variant="neutral">Faculty Directory</Badge>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Explore Computer Science Faculty
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Search, filter by rank and research domain, and book advising consultations.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search Bar */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search faculty name or field..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
            />
          </div>

          {/* Filter 1: Designation */}
          <div>
            <select
              value={designationFilter}
              onChange={(e) => { setDesignationFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
            >
              <option value="all">All Ranks / Designations</option>
              <option value="Professor">Professors</option>
              <option value="Associate Professor">Associate Professors</option>
              <option value="Assistant Professor">Assistant Professors</option>
              <option value="Senior Lecturer">Senior Lecturers</option>
            </select>
          </div>

          {/* Filter 2: Research Domain */}
          <div>
            <select
              value={researchFilter}
              onChange={(e) => { setResearchFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
            >
              <option value="all">All Research Fields</option>
              {researchDomains.map((domain, idx) => (
                <option key={idx} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
            >
              <option value="name-asc">Sort: Name (A to Z)</option>
              <option value="name-desc">Sort: Name (Z to A)</option>
              <option value="rank">Sort: Seniority / Rank</option>
            </select>
          </div>

        </div>

        {/* Results summary & Reset */}
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span>
            Showing <strong className="text-zinc-900 dark:text-white font-semibold">{filteredAndSorted.length}</strong> faculty profiles
          </span>
          {(search || designationFilter !== 'all' || researchFilter !== 'all' || sortBy !== 'name-asc') && (
            <button
              onClick={handleReset}
              className="text-zinc-900 dark:text-zinc-100 font-semibold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Cards Per Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginatedItems.length > 0 ? (
          paginatedItems.map((f) => (
            <FacultyCard
              key={f.id}
              faculty={f}
              onSelect={onSelectFaculty}
              onRequireAuth={onRequireAuth}
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">No matching faculty found</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Try modifying your filter options or search term.</p>
            <Button variant="outline" size="sm" onClick={handleReset} className="mt-4">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-semibold transition-colors btn-press ${
                  isCurrent
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

    </div>
  );
}
