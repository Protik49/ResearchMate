import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  UserCheck,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Download,
  Printer,
  Sparkles,
  Filter,
  Layers,
  ListOrdered,
  X,
  FileText
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export default function ExamsPage({ examsList }) {
  const [query, setQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedSession, setSelectedSession] = useState('all');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' | 'grid' | 'table'
  const [pinnedExamIds, setPinnedExamIds] = useState(() => {
    try {
      const saved = localStorage.getItem('pinned_exams');
      return saved ? JSON.parse(saved) : ['ex-1', 'ex-3'];
    } catch {
      return ['ex-1', 'ex-3'];
    }
  });
  const [isSlipOpen, setIsSlipOpen] = useState(false);

  // Save pinned exams to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pinned_exams', JSON.stringify(pinnedExamIds));
    } catch (e) {
      // Ignore
    }
  }, [pinnedExamIds]);

  // Countdown timer to earliest exam (Nov 16, 2026 09:00 AM)
  const targetTime = useMemo(() => new Date('2026-11-16T09:00:00').getTime(), []);
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 19, minutes: 42, seconds: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // All distinct exam dates for the tab bar
  const distinctDates = useMemo(() => {
    const map = new Map();
    examsList.forEach((e) => {
      if (!map.has(e.date)) {
        map.set(e.date, { date: e.date, dayLabel: e.dayLabel || 'Day' });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [examsList]);

  // Filtered exams
  const filteredExams = useMemo(() => {
    return examsList.filter((item) => {
      const q = query.toLowerCase();
      const matchesSearch =
        item.courseCode.toLowerCase().includes(q) ||
        item.courseTitle.toLowerCase().includes(q) ||
        item.facultyName.toLowerCase().includes(q) ||
        item.room.toLowerCase().includes(q);

      const matchesDay = selectedDay === 'all' || item.date === selectedDay;
      const matchesSession = selectedSession === 'all' || item.session === selectedSession;

      return matchesSearch && matchesDay && matchesSession;
    });
  }, [examsList, query, selectedDay, selectedSession]);

  // Toggle pinning
  const togglePin = (id) => {
    setPinnedExamIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pinned exams list
  const pinnedExams = useMemo(() => {
    return examsList.filter((e) => pinnedExamIds.includes(e.id));
  }, [examsList, pinnedExamIds]);

  // Conflict Checker: Check if any pinned exams have overlapping dates
  const hasConflict = useMemo(() => {
    const dateCounts = {};
    for (const ex of pinnedExams) {
      if (dateCounts[ex.date]) return true;
      dateCounts[ex.date] = (dateCounts[ex.date] || 0) + 1;
    }
    return false;
  }, [pinnedExams]);

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BRACU CSE//Exam Timeline//EN\n";
    pinnedExams.forEach((ex) => {
      const dt = ex.date.replace(/-/g, '');
      icsContent += `BEGIN:VEVENT\nSUMMARY:${ex.courseCode} - ${ex.courseTitle}\nDESCRIPTION:Invigilator: ${ex.facultyName}\\nRoom: ${ex.room}\nLOCATION:Building UB-07, Room ${ex.room}\nDTSTART:${dt}T090000Z\nDTEND:${dt}T110000Z\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'bracu_cse_exam_slip.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
          <span>Fall 2026 Academic Term Evaluations</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.12]">
          CSE Examination Timeline & Hall Rosters
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Chronological milestone timeline, examination hall allocations in Building UB-07, invigilator rosters, and conflict-free personal timetable builder.
        </p>
      </div>

      {/* 2. Next Upcoming Exam Countdown Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-[#FFFBF5] dark:bg-zinc-900/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200/70 dark:border-amber-800">
            NEXT EVALUATION MILESTONE
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            CSE110 Programming Language I (Java)
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Monday, Nov 16 · 09:00 AM – 11:00 AM · Hall UB07-101 · Invigilator: Dr. Sadia Hamid Kazi
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-2 sm:gap-3 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 min-w-[64px]">
            <span className="block text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">{timeLeft.days}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Days</span>
          </div>
          <span className="text-xl font-bold text-zinc-300">:</span>
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 min-w-[64px]">
            <span className="block text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Hours</span>
          </div>
          <span className="text-xl font-bold text-zinc-300">:</span>
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 min-w-[64px]">
            <span className="block text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Mins</span>
          </div>
          <span className="text-xl font-bold text-zinc-300">:</span>
          <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 min-w-[64px]">
            <span className="block text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Secs</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Toolbar: Date Tabs, Session Filters & View Modes */}
      <div className="space-y-4">
        
        {/* Date Tabs Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all btn-press ${
              selectedDay === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
            }`}
          >
            All Dates ({examsList.length})
          </button>
          {distinctDates.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDay(d.date)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all btn-press ${
                selectedDay === d.date
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
              }`}
            >
              {d.dayLabel}, {d.date.substring(5)}
            </button>
          ))}
        </div>

        {/* Filter controls row */}
        <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search course code, professor, or hall..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100"
            />
          </div>

          {/* Session filter & View toggle */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            
            {/* Session dropdown */}
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
            >
              <option value="all">All Sessions</option>
              <option value="Morning">Morning (09:00 AM)</option>
              <option value="Midday">Midday (12:00 PM)</option>
              <option value="Afternoon">Afternoon (02:30 PM)</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Timeline View"
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Card Grid View"
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
                title="Roster Table View"
              >
                Table
              </button>
            </div>

            {/* Slip Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsSlipOpen(true)}
              className="rounded-full flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>My Slip ({pinnedExamIds.length})</span>
            </Button>

          </div>

        </div>

      </div>

      {/* 4. MAIN CONTENT AREA: VIEW MODES */}

      {/* A) TIMELINE RAIL VIEW */}
      {viewMode === 'timeline' && (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8 ml-2 sm:ml-4">
          {filteredExams.map((exam, idx) => {
            const isPinned = pinnedExamIds.includes(exam.id);
            return (
              <div key={exam.id} className="relative group">
                
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full border-4 border-white dark:border-[#09090B] bg-zinc-900 dark:bg-zinc-100 group-hover:scale-125 transition-transform" />

                {/* Timeline Card */}
                <div className="p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300 dark:hover:border-zinc-700 card-hover space-y-5">
                  
                  {/* Top Bar: Date, Session, Badges & Pin Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                        {exam.courseCode}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        {exam.section}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                        {exam.type || 'Theory Final'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {exam.dayLabel}, {exam.date}
                      </span>
                      <button
                        onClick={() => togglePin(exam.id)}
                        className={`p-1.5 rounded-full border transition-all btn-press ${
                          isPinned
                            ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                        title={isPinned ? 'Remove from My Slip' : 'Pin to My Exam Slip'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {exam.courseTitle}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Standard undergraduate computing evaluation · {exam.credits || 3.0} Academic Credits
                    </p>
                  </div>

                  {/* Key Exam Hall Specs Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-zinc-400">Time Window</span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{exam.startTime} – {exam.endTime} ({exam.duration || '2h'})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-zinc-400">Examination Hall</span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{exam.room} ({exam.hallCapacity || 60} Seats)</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 text-zinc-400 shrink-0" />
                      <div className="truncate">
                        <span className="block text-[10px] uppercase font-bold text-zinc-400">Assigned Invigilator</span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{exam.facultyName}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* B) CARD GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => {
            const isPinned = pinnedExamIds.includes(exam.id);
            return (
              <Card key={exam.id} className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      {exam.courseCode}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                      {exam.courseTitle}
                    </h3>
                    <span className="text-xs text-zinc-500">{exam.section} · {exam.type || 'Theory'}</span>
                  </div>

                  <button
                    onClick={() => togglePin(exam.id)}
                    className={`p-2 rounded-full border transition-all btn-press ${
                      isPinned
                        ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-400'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-400"><Calendar className="w-3.5 h-3.5" /> Date</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{exam.dayLabel}, {exam.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-400"><Clock className="w-3.5 h-3.5" /> Time</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{exam.startTime} – {exam.endTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-400"><MapPin className="w-3.5 h-3.5" /> Hall</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{exam.room}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-zinc-400"><UserCheck className="w-3.5 h-3.5" /> Invigilator</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[180px]">{exam.facultyName}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* C) TABLE / ROSTER NOTICE VIEW */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Title</th>
                <th className="p-4">Date & Session</th>
                <th className="p-4">Time Window</th>
                <th className="p-4">Exam Hall</th>
                <th className="p-4">Faculty Invigilator</th>
                <th className="p-4 text-right">My Slip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredExams.map((exam) => {
                const isPinned = pinnedExamIds.includes(exam.id);
                return (
                  <tr key={exam.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">{exam.courseCode}</td>
                    <td className="p-4 font-medium text-zinc-800 dark:text-zinc-200">{exam.courseTitle}</td>
                    <td className="p-4 font-medium">{exam.dayLabel}, {exam.date}</td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-400">{exam.startTime} – {exam.endTime}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-semibold">{exam.room}</span></td>
                    <td className="p-4 text-zinc-600 dark:text-zinc-300">{exam.facultyName}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => togglePin(exam.id)}
                        className={`p-1.5 rounded-full border transition-all ${
                          isPinned
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'border-zinc-200 text-zinc-400 hover:text-zinc-900'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Examination Regulations & Hall Guidelines Card */}
      <div className="p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Official Examination Hall Instructions (Building UB-07)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/70">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">1. Reporting & Seating</span>
            <p>Students must report to their allotted examination hall exactly 15 minutes prior to the start time. No entry is permitted after 30 minutes from commencement.</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/70">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">2. Mandatory Physical ID</span>
            <p>Original physical BRAC University Student ID Card is strictly required on your desk. Digital scans or photos on mobile phones are non-permissible.</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/70">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">3. Calculator & Device Policy</span>
            <p>Only non-programmable scientific calculators are permitted for applicable courses (CSE220, CSE321). All smartwatches and phones must remain turned off in bags.</p>
          </div>
        </div>
      </div>

      {/* 6. MODAL / SLIP DRAWER: Student Examination Slip */}
      {isSlipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">BRAC UNIVERSITY · SDCS</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Student Examination Admit Slip
                </h3>
                <p className="text-xs text-zinc-500">Official Fall 2026 course schedule selection</p>
              </div>
              <button
                onClick={() => setIsSlipOpen(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conflict Detection Banner */}
            {hasConflict ? (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Notice: Two or more of your pinned courses fall on the same day. Please review time slots carefully!</span>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Zero scheduling conflicts detected across your selected examination slots.</span>
              </div>
            )}

            {/* Pinned Courses List */}
            <div className="space-y-3">
              {pinnedExams.length > 0 ? (
                pinnedExams.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-zinc-900 dark:text-white">{ex.courseCode}</span>
                        <span className="text-[11px] text-zinc-500">· {ex.section}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">{ex.courseTitle}</h4>
                      <p className="text-[11px] text-zinc-500">{ex.dayLabel}, {ex.date} · {ex.startTime} – {ex.endTime}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {ex.room}
                      </span>
                      <button
                        onClick={() => togglePin(ex.id)}
                        className="block text-[11px] text-rose-600 dark:text-rose-400 hover:underline mt-1.5 ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-zinc-400">
                  No courses pinned yet. Click the bookmark icon on any exam in the timeline to build your slip.
                </div>
              )}
            </div>

            {/* Action Buttons: Print & iCal sync */}
            {pinnedExams.length > 0 && (
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-full"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Sync to Calendar (.ics)</span>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-full"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Slip</span>
                </Button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
