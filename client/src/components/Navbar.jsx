import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  Bookmark,
  LogOut,
  ChevronDown,
  Shield,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Dropdown from './ui/Dropdown';
import Button from './ui/Button';

export default function Navbar({ onOpenAuth }) {
  const { user, signOut, savedFacultyIds } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Contact link permanently removed as requested
  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore Faculty' },
    { path: '/exams', label: 'Exam Timeline' },
    { path: '/updates', label: 'Notices' },
    { path: '/about', label: 'About Department' },
  ];

  const navLinks = user
    ? [
        { path: '/', label: 'Home' },
        { path: '/explore', label: 'Explore' },
        { path: '/exams', label: 'Exam Timeline' },
        {
          path: user.role === 'admin' ? '/admin' : '/dashboard',
          label: user.role === 'admin' ? 'Admin Center' : 'Dashboard'
        },
        { path: '/saved', label: 'Saved', badge: savedFacultyIds.length > 0 ? savedFacultyIds.length : null },
        { path: '/updates', label: 'Notices' },
      ]
    : publicLinks;

  const profileMenuItems = [
    {
      label: `${user?.fullName || 'Academic User'} (${user?.role || 'student'})`,
      icon: <Shield className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
      onClick: () => {}
    },
    { divider: true },
    {
      label: user?.role === 'admin' ? 'Admin Control Center' : 'Student Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      onClick: () => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')
    },
    {
      label: 'My Saved Faculty',
      icon: <Bookmark className="w-4 h-4" />,
      onClick: () => navigate('/saved')
    },
    { divider: true },
    {
      label: 'Sign Out',
      danger: true,
      icon: <LogOut className="w-4 h-4" />,
      onClick: signOut
    }
  ];

  const getDisplayName = () => {
    if (!user) return '';
    if (user.role === 'admin') return 'Admin';
    if (user.fullName) {
      const first = user.fullName.trim().split(' ')[0];
      return first.length > 12 ? `${first.slice(0, 10)}...` : first;
    }
    return user.email ? user.email.split('@')[0] : 'User';
  };

  const getAvatarChar = () => {
    if (!user) return 'U';
    if (user.role === 'admin') return 'A';
    return (user.fullName || user.email || 'U').charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 select-none shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform duration-150">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-900 dark:text-white tracking-tight text-[17px]">
              BRACU Faculty
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700">
              CSE
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Acctual Style: clean, generous gap, mature typography) */}
        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[14px] whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 py-1 ${
                  active
                    ? 'font-bold text-zinc-900 dark:text-white after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-black dark:after:bg-white after:rounded-full'
                    : 'font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold leading-none ${
                      item.label === 'Admin Center'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-black text-white dark:bg-white dark:text-black'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white flex items-center justify-center transition-colors btn-press"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* User Auth / Profile Dropdown */}
          {user ? (
            <Dropdown
              align="right"
              trigger={
                <button
                  className="h-9 px-3.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center gap-2 text-xs font-semibold shadow-xs transition-colors btn-press"
                >
                  <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] flex items-center justify-center shrink-0">
                    {getAvatarChar()}
                  </div>
                  <span className="whitespace-nowrap">
                    {getDisplayName()}
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 leading-none">
                      Root
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                </button>
              }
              items={profileMenuItems}
            />
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenAuth}
              className="rounded-full px-5 py-2 text-xs font-semibold bg-black hover:bg-zinc-800 text-white shadow-xs"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center btn-press"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] px-6 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-semibold ${
                isActive(item.path)
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              {item.label} {item.badge ? `(${item.badge})` : ''}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
