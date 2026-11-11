import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Atom,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import FacultyCard from '../components/FacultyCard';
import SkeletonCard from '../components/SkeletonCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export default function HomePage({ facultyList, updatesList, isLoading, onSelectFaculty, onRequireAuth }) {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const featurePillars = [
    {
      dotColor: "bg-blue-600",
      title: "Faculty Directory & Bio",
      desc: "32 verified professor credentials, research domains, direct email, and room UB-07 numbers."
    },
    {
      dotColor: "bg-emerald-600",
      title: "Office Hours & Walk-ins",
      desc: "Real-time consultation schedules for academic advising, thesis draft reviews, and course guidance."
    },
    {
      dotColor: "bg-amber-600",
      title: "Thesis Supervisor Matching",
      desc: "Direct 1-on-1 mentorship for final year undergraduate capstone papers and IEEE/ACM submissions."
    },
    {
      dotColor: "bg-cyan-600",
      title: "Exam Hall Rosters",
      desc: "Automated exam timelines, Building UB-07 hall seat allocations, and invigilator rosters."
    },
    {
      dotColor: "bg-purple-600",
      title: "Department Bulletins",
      desc: "Instant notices on makeup lectures, lab project defense sessions, and departmental events."
    },
    {
      dotColor: "bg-rose-600",
      title: "Student Advising Desk",
      desc: "Direct academic inquiry system stored into Supabase with coordinator replies within 24 hours."
    }
  ];

  const faqs = [
    {
      q: "How do I request an undergraduate thesis supervisor?",
      a: "Review faculty research interests in the directory, identify candidate advisors in your domain (e.g. Health AI, Robotics, Cryptography), and contact them with your concept draft during the pre-advising period."
    },
    {
      q: "Where can I find exam hall seat allotments?",
      a: "Exam dates, room assignments in Building UB-07, and invigilator rosters are published directly under the Exam Timeline page 14 days before finals. You can pin courses to your personal exam slip and print it directly."
    },
    {
      q: "Are office hours open for walk-in consultations?",
      a: "Yes. Each professor's designated office room on Level 7, Building UB-07 and open advising slots (e.g. Sun/Tue 02:00 PM – 04:00 PM) are listed on their verified profile details."
    },
    {
      q: "Can I save multiple faculty profiles for thesis advising?",
      a: "Registered students can bookmark faculty profiles to their personal dashboard for rapid tracking, office hour alerts, and direct contact history."
    },
    {
      q: "How do I report an exam timetable conflict?",
      a: "If two of your registered courses have overlapping examination time slots, open your personal Exam Slip and click 'Report Conflict' to alert the CSE Exam Committee automatically."
    },
    {
      q: "What research facilities are available for CSE students?",
      a: "The department provides 4 core research facilities in Building UB-07: High Performance Computing Cluster, Autonomous Robotics Testbed, Cyber-Physical Systems Lab, and Bioinformatics Data Pipeline."
    }
  ];

  return (
    <div className="space-y-32 pb-32 text-left">
      
      {/* ========================================================
          1. HERO SECTION (Acctual Style: Bold, Airy, Large Typography)
          ======================================================== */}
      <section className="pt-20 sm:pt-28 pb-12 text-center max-w-5xl mx-auto px-6">
        
        {/* Top Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF4FF] dark:bg-blue-950/40 border border-[#D0E2FF] dark:border-blue-900/60 text-[#0066FF] dark:text-blue-300 text-xs font-semibold mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Department of Computer Science & Engineering · Fall 2026 Roster</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.04] max-w-4xl mx-auto">
          Connect with World-Class Faculty, Mentors & Researchers
        </h1>

        {/* Subtitle */}
        <p className="mt-7 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Browse verified faculty credentials, consultation hours in UB-07, undergraduate thesis mentorship tracks, and conflict-free exam rosters.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/explore">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-100 px-8 py-4 text-base font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore Faculty Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link to="/exams">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-7 py-4 text-base font-semibold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Exam Timeline
            </Button>
          </Link>
        </div>

        {/* 3 Bullet Micro-Features Underneath CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            32 Verified SDCS Faculty
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Walk-in Office Hours in UB-07
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Conflict-Free Exam Rosters
          </span>
        </div>

        {/* Hero Showcase Mockup: Layered Academic Advising & Thesis Slip */}
        <div className="mt-16 sm:mt-20 relative max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-zinc-100/90 to-zinc-50/20 dark:from-zinc-900/80 dark:to-zinc-950/40 border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden">
            
            {/* Main Center Card (Advising Slip Mockup) */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-700/80 p-6 sm:p-8 text-left shadow-lg space-y-6">
              
              {/* Slip Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">BRAC University · SDCS Advising Slip</h3>
                    <p className="text-[11px] text-zinc-500">Department of Computer Science & Engineering · Fall 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    ADVISING VERIFIED
                  </span>
                  <span className="text-xs font-mono text-zinc-400">#SDCS-2026-F</span>
                </div>
              </div>

              {/* Sample Courses Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-zinc-400 uppercase tracking-wider text-[10px] border-b border-zinc-100 dark:border-zinc-800">
                      <th className="pb-3">Course</th>
                      <th className="pb-3">Course Title</th>
                      <th className="pb-3">Assigned Faculty</th>
                      <th className="pb-3">Room</th>
                      <th className="pb-3 text-right">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className="py-3 font-bold text-zinc-900 dark:text-white">CSE321</td>
                      <td className="py-3">Operating Systems</td>
                      <td className="py-3 text-zinc-900 dark:text-zinc-100 font-medium">Matin Saad Abdullah, PhD</td>
                      <td className="py-3 font-mono text-zinc-500">UB-0704</td>
                      <td className="py-3 text-right font-bold">3.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-zinc-900 dark:text-white">CSE422</td>
                      <td className="py-3">Artificial Intelligence</td>
                      <td className="py-3 text-zinc-900 dark:text-zinc-100 font-medium">Prof. Chowdhury Mofizur Rahman, PhD</td>
                      <td className="py-3 font-mono text-zinc-500">UB-0705</td>
                      <td className="py-3 text-right font-bold">3.0</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-zinc-900 dark:text-white">CSE221</td>
                      <td className="py-3">Algorithms & Complexity</td>
                      <td className="py-3 text-zinc-900 dark:text-zinc-100 font-medium">Mohammad Kaykobad, PhD</td>
                      <td className="py-3 font-mono text-zinc-500">UB-0703</td>
                      <td className="py-3 text-right font-bold">3.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Slip Bottom Specs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  Building UB-07, 66 Mohakhali, Dhaka 1212
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Total Enrolled: 9.0 Credits · Status: Cleared for Finals
                </span>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ========================================================
          2. INSTITUTIONAL & RESEARCH COLLABORATORS STRIP
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
          COLLABORATING ACROSS GLOBAL RESEARCH BODIES & ACCREDITATIONS
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            BRAC University SDCS
          </span>
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            IEEE Computer Society
          </span>
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            ACM Student Chapter
          </span>
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            CERN Computing Collab
          </span>
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            Cambridge Alumni Faculty
          </span>
          <span className="px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            IEB BAETE Accredited
          </span>
        </div>
      </section>

      {/* ========================================================
          3. HIGHLIGHT CALLOUT CARD (Warm Tinted Banner)
          ======================================================== */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border border-[#FBEAD4] bg-[#FFFBF5] dark:bg-zinc-900/60 dark:border-zinc-800 p-10 sm:p-14 text-center space-y-5 shadow-xs">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
            FALL 2026 PRE-ADVISING ACTIVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Direct Thesis Supervisor Matching & Advising Consultations
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Undergraduate students can browse 32 professor profiles, check real-time office hours, and secure thesis supervisor approval for Fall 2026 without bureaucratic delays.
          </p>
          <div className="pt-2">
            <Link to="/explore">
              <Button variant="primary" size="md" className="rounded-full bg-black hover:bg-zinc-800 text-white px-7 py-3">
                <span>View Faculty Advising Hours</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. 6-GRID FEATURE PILLARS (With Colored Bullet Indicators)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            ACADEMIC CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Everything you need to navigate computing research & advising
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Engineered specifically for BRAC University CSE students, researchers, and faculty members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featurePillars.map((feat, idx) => (
            <Card key={idx} className="p-8 space-y-3 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${feat.dotColor}`} />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {feat.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal pl-5">
                {feat.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. 3 HIGHLIGHT COLOR ACCENT CARDS (Pastel Bottom Containers)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            STUDENT PORTAL MODES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            An advising workflow for every academic track
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Blue Tint Bar */}
          <Card className="p-8 space-y-5 flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">ADVISING</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Student Advising Desk
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Book direct consultations with professors and lecturers for pre-registration and coursework guidance.
              </p>
            </div>
            <div className="h-36 rounded-2xl bg-[#EEF4FF] dark:bg-blue-950/40 border border-[#D0E2FF] dark:border-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-300">
              <GraduationCap className="w-10 h-10" />
            </div>
          </Card>

          {/* Card 2: Pink/Rose Tint Bar */}
          <Card className="p-8 space-y-5 flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400">RESEARCH</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Thesis Defense Laboratory
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                Submit project drafts directly to active supervisors across AI, robotics, bioinformatics, and networks.
              </p>
            </div>
            <div className="h-36 rounded-2xl bg-[#FDF2F8] dark:bg-rose-950/40 border border-[#FCE7F3] dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-300">
              <Atom className="w-10 h-10" />
            </div>
          </Card>

          {/* Card 3: Purple Tint Bar */}
          <Card className="p-8 space-y-5 flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">EVALUATION</span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Exam Timetable Rail
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                View chronological milestone timelines with seat allotment and personal schedule slip export.
              </p>
            </div>
            <div className="h-36 rounded-2xl bg-[#F3E8FF] dark:bg-purple-950/40 border border-[#E9D5FF] dark:border-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <Clock className="w-10 h-10" />
            </div>
          </Card>

        </div>
      </section>

      {/* ========================================================
          6. "CUSTOMIZE EVERY DETAIL" / CHECKLIST SECTION
          ======================================================== */}
      <section className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            ADVANCED FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Engineered for every stage of your computing degree
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Pre-Advising Matching", desc: "Find thesis advisors by research area" },
            { title: "Conflict-Free Rosters", desc: "Automated exam schedule verification" },
            { title: "1-Click Bookmarking", desc: "Pin faculty to your personal dashboard" },
            { title: "Official BRACU Bios", desc: "Verified Cambridge, UWA & international PhDs" },
            { title: "Academic Bulletins", desc: "Notices on makeup classes and lab sessions" },
            { title: "Instant Slip Printing", desc: "Download .ics calendar and print slips" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex items-start gap-3.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. 4 ALTERNATING EDITORIAL STORY BLOCKS (Reference Match)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-32 lg:space-y-40">
        
        {/* Block 1: Left Image, Right Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
              alt="Undergraduate research and thesis drafting"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              THESIS & MENTORSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              1-on-1 Undergraduate Thesis Guidance & Supervision
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Work alongside internationally recognized professors in computer vision, robotics, blockchain, and bioinformatics. Students co-author publications at IEEE, ACM, and top peer-reviewed conferences while building practical computational artifacts.
            </p>
            <blockquote className="border-l-2 border-black dark:border-white pl-5 italic text-sm text-zinc-600 dark:text-zinc-400">
              "Working under Dr. Sadia Hamid Kazi gave our team the opportunity to present our deep learning paper at IEEE EMBC."
              <span className="block not-italic font-semibold text-zinc-900 dark:text-zinc-200 mt-1.5">— Samiha Rahman, CSE Batch '23</span>
            </blockquote>
          </div>
        </div>

        {/* Block 2: Right Image, Left Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-5 text-left lg:order-1 order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              EXAM ROSTERS & TIMELINES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              Automated Conflict-Free Exam Hall Rosters
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              View semester final and midterm timetables across Building UB-07 examination halls with assigned invigilators, exact time windows, and seat numbers. Pin courses to your personal schedule slip and export directly to your calendar.
            </p>
            <blockquote className="border-l-2 border-black dark:border-white pl-5 italic text-sm text-zinc-600 dark:text-zinc-400">
              "Zero overlapping exam slots and instant calendar synchronization makes finals week organized and calm."
              <span className="block not-italic font-semibold text-zinc-900 dark:text-zinc-200 mt-1.5">— Abrar Faysal, CSE Batch '24</span>
            </blockquote>
            <div className="pt-2">
              <Link to="/exams">
                <Button variant="outline" size="sm" className="rounded-full px-5 py-2.5 text-xs font-semibold">
                  Open Exam Timeline →
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-lg lg:order-2 order-1">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
              alt="Exam hall scheduling and calendar"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Block 3: Left Image, Right Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Faculty office and consultation rooms"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              CAMPUS PRESENCE & OFFICE HOURS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              Direct Office Hours in Building UB-07
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Drop by for walk-in consultations or schedule focused advising slots during pre-registration. Every professor's room number, department email, and research interests are verified directly from university records.
            </p>
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="font-bold text-zinc-900 dark:text-white block mb-1 text-sm">Level 7, Building UB-07</span>
              Open Sunday through Thursday, 09:00 AM – 05:00 PM for academic consultations and thesis advising.
            </div>
          </div>
        </div>

        {/* Block 4: Right Image, Left Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-5 text-left lg:order-1 order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              SDCS COMPUTING FACILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              State-of-the-Art Research Clusters & GPU Workstations
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Access departmental high-performance computing clusters, robotics testbeds, and bioinformatics sequencing pipelines dedicated to student and faculty research under the School of Data & Computational Sciences.
            </p>
            <blockquote className="border-l-2 border-black dark:border-white pl-5 italic text-sm text-zinc-600 dark:text-zinc-400">
              "4 Core Departmental Research Laboratories actively supporting undergraduate thesis researchers."
            </blockquote>
          </div>
          <div className="relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-lg lg:order-2 order-1">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
              alt="High performance computing clusters"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

      </section>

      {/* ========================================================
          8. CORE FACULTY ROSTER (4 Cards Desktop Responsive Grid)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
          <div className="space-y-2">
            <Badge variant="neutral">Faculty Roster</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Featured Professors & Advisors
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Actively advising Fall 2026 undergraduate thesis and research fellowships.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 rounded-full px-5 py-2.5">
              <span>View All 32 Faculty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            facultyList.slice(0, 4).map((f) => (
              <FacultyCard
                key={f.id}
                faculty={f}
                onSelect={onSelectFaculty}
                onRequireAuth={onRequireAuth}
              />
            ))
          )}
        </div>
      </section>

      {/* ========================================================
          9. SECURITY & ACCREDITATION BANNER (2 Shield Cards)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10 text-center">
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            ACCREDITATION & TRUST
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Rigorous standards for computing excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          {/* Shield Card 1 (Blue) */}
          <div className="p-10 rounded-3xl border border-[#D0E2FF] dark:border-blue-900/50 bg-[#EEF4FF] dark:bg-blue-950/30 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              BAETE IEB Accredited Program
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Our BSc in CSE program is fully accredited under the Washington Accord guidelines by the Board of Accreditation for Engineering and Technical Education.
            </p>
          </div>

          {/* Shield Card 2 (Purple) */}
          <div className="p-10 rounded-3xl border border-[#E9D5FF] dark:border-purple-900/50 bg-[#F3E8FF] dark:bg-purple-950/30 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              100% Verified Faculty Roster
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              All 32 faculty credentials, research interests, and office room allotments are synchronized directly with official BRAC University records.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================
          11. ACCORDION FAQ SECTION (Matches Reference "FAQs")
          ======================================================== */}
      <section className="max-w-3xl mx-auto px-6 space-y-10">
        <div className="text-left space-y-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            FAQs
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Common questions regarding faculty consultations, thesis advising, and exam hall procedures.
          </p>
        </div>

        <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800 border-y border-zinc-200/80 dark:border-zinc-800">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-zinc-400 shrink-0 font-normal text-xl">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="pt-4 pr-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
