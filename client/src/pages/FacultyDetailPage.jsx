import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bookmark,
  Mail,
  MapPin,
  ExternalLink,
  BookOpen,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import FacultyCard from '../components/FacultyCard';

export default function FacultyDetailPage({ facultyList, onSelectFaculty, onRequireAuth }) {
  const { id } = useParams();
  const { user, savedFacultyIds, toggleSaveFaculty } = useAuth();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const faculty = facultyList.find((f) => f.id === id) || facultyList[0];

  if (!faculty) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold">Faculty Profile Not Found</h2>
        <Link to="/explore" className="text-zinc-900 dark:text-white underline text-xs mt-2 inline-block">Return to directory</Link>
      </div>
    );
  }

  const isSaved = savedFacultyIds.includes(faculty.id);

  // Media Section: Image gallery
  const galleryImages = [
    faculty.imageUrl,
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
  ];

  // Related faculty (same research field)
  const relatedFaculty = facultyList
    .filter((f) => f.id !== faculty.id && (f.researchInterests || []).some(r => (faculty.researchInterests || []).includes(r)))
    .slice(0, 4);

  // Student reviews / advising ratings (Academic feedback)
  const studentReviews = [
    {
      student: "Tahsin A. (Batch '24)",
      rating: 5,
      date: "Oct 2026",
      comment: "Incredible guidance during our thesis on Distributed Systems. Extremely responsive and encourages independent exploration."
    },
    {
      student: "Farhan M. (Batch '25)",
      rating: 5,
      date: "Aug 2026",
      comment: "Office hours were tremendously helpful for understanding advanced algorithmic complexity topics."
    }
  ];

  const handleBookmark = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    toggleSaveFaculty(faculty.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      
      {/* Back button */}
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Faculty Directory</span>
      </Link>

      {/* Main Profile Header & Media Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Media Section: Multi-image Gallery */}
        <div className="lg:col-span-1 space-y-3">
          <div className="relative h-80 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
            <img
              src={galleryImages[activeImageIdx]}
              alt={faculty.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            {galleryImages.length > 1 && (
              <div className="absolute inset-x-2 bottom-2 flex justify-between">
                <button
                  onClick={() => setActiveImageIdx(i => (i === 0 ? galleryImages.length - 1 : i - 1))}
                  className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 btn-press"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIdx(i => (i === galleryImages.length - 1 ? 0 : i + 1))}
                  className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 btn-press"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx ? 'border-zinc-900 dark:border-white' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section: Overview & Core Specs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">{faculty.department || 'Computer Science & Engineering'}</Badge>
              <Badge variant="neutral">Verified Faculty Member</Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {faculty.name}
            </h1>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {faculty.designation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={isSaved ? "primary" : "outline"}
              size="md"
              onClick={handleBookmark}
              className="flex items-center gap-2 rounded-full"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved to Your Advising List' : 'Save Faculty Profile'}</span>
            </Button>

            <a href={faculty.profileUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="md" className="flex items-center gap-1.5 rounded-full">
                <span>Official BRACU Bio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>

            <Link to="/contact">
              <Button variant="primary" size="md" className="rounded-full">
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-400">Office Room</span>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1">{faculty.room || 'UB-07 CSE Department'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-400">Direct Email</span>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1">{faculty.email || 'faculty@bracu.ac.bd'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-400">Advising Hours</span>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-1">Sun/Tue 02:00 PM – 04:00 PM</p>
            </div>
          </div>

          {/* Overview / Bio */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Faculty Biography & Research Scope
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {faculty.bio || "Active academic faculty member leading undergraduate capstone thesis investigations and preparing students for competitive technological careers."}
            </p>
          </div>

          {/* Research tags */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Research Domains
            </h3>
            <div className="flex flex-wrap gap-2">
              {(faculty.researchInterests || []).map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Reviews & Advising Ratings */}
      <div className="space-y-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Student Advising & Mentorship Feedback
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {studentReviews.map((rev, idx) => (
            <Card key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">{rev.student}</span>
                <div className="flex items-center text-amber-400 text-xs">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                "{rev.comment}"
              </p>
              <span className="text-[10px] text-zinc-400 block pt-1">{rev.date}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Faculty Section */}
      {relatedFaculty.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Related Faculty in Similar Research Areas
            </h2>
            <Link to="/explore" className="text-xs text-zinc-900 dark:text-zinc-100 font-medium hover:underline">
              View all faculty →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedFaculty.map((rf) => (
              <FacultyCard
                key={rf.id}
                faculty={rf}
                onSelect={onSelectFaculty}
                onRequireAuth={onRequireAuth}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
