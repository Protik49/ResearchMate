import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-[#09090B] text-zinc-600 dark:text-zinc-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Campus */}
          <div className="space-y-4 md:col-span-1 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4 text-zinc-100 dark:text-zinc-900" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white text-sm tracking-tight">
                BRAC University CSE
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
              School of Data & Computational Sciences. Fostering research excellence, innovation, and technological leadership in Bangladesh.
            </p>
            <div className="flex items-center gap-3 pt-1 text-zinc-500">
              <a href="https://www.bracu.ac.bd" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="mailto:info@bracu.ac.bd" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Academic Portals */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Academic Portal
            </h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Faculty Directory</Link></li>
              <li><Link to="/updates" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Academic Bulletins</Link></li>
              <li><Link to="/saved" className="hover:text-zinc-900 dark:hover:text-white transition-colors">My Saved Advisors</Link></li>
              <li><Link to="/contact" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Student Advising Desk</Link></li>
            </ul>
          </div>

          {/* Col 3: Research Domains */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Research Areas
            </h4>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><span>Quantum Computing & Algorithms</span></li>
              <li><span>Robotics & Autonomous Systems</span></li>
              <li><span>Cybersecurity & Decentralized Tech</span></li>
              <li><span>Bioinformatics & Genomics</span></li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Department Office
            </h4>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-zinc-400 shrink-0" />
                <span>Level 7, Building UB-07, 66 Mohakhali, Dhaka 1212</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>cse.department@bracu.ac.bd</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>+880-2-222264051 Ext: 401</span>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} BRAC University CSE Department. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Advising</Link>
            <a href="https://www.bracu.ac.bd/privacy-policy" target="_blank" rel="noreferrer" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
