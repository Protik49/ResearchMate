import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, Target, CheckCircle2, Shield, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function AboutPage() {
  const highlights = [
    { title: "BAETE Accredited", desc: "Our BSc in CSE program is fully accredited by the Board of Accreditation for Engineering and Technical Education (IEB)." },
    { title: "World-Ranked Research", desc: "Pioneering publications in quantum machine learning, mobile sensing, and structural computational biology." },
    { title: "State-of-the-Art Labs", desc: "High Performance Computing clusters, Embedded Robotics facilities, and VR simulation centers located in UB-07." },
    { title: "Industry Partnerships", desc: "Active research collaboration with global computing hubs, CERN, and multinational software leaders." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 text-left">
      
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="neutral">Department Overview</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Department of Computer Science & Engineering
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl font-normal">
          Established under the School of Data & Computational Sciences, BRAC University CSE is dedicated to advancing computational knowledge, fostering breakthrough innovation, and cultivating ethical engineers.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {highlights.map((h, i) => (
          <Card key={i} className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{h.title}</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">{h.desc}</p>
          </Card>
        ))}
      </div>

      {/* Leadership Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Departmental Leadership
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-zinc-400">Dean, School of Data & Computational Sciences</span>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Mahbubul Alam Majumdar, PhD</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">PhD in Theoretical Physics from University of Cambridge. Fellow of the Institute of Physics (FInstP).</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-[10px] font-semibold uppercase text-zinc-400">Chairperson, Department of CSE</span>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Sadia Hamid Kazi, PhD</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">PhD in Health Informatics from University of Western Australia. Senior Member, IEEE.</p>
          </Card>
        </div>
      </div>

      {/* Campus Location */}
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Campus Office & Consultation Hours
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Level 7, Building UB-07, 66 Mohakhali, Dhaka 1212, Bangladesh.<br />
          Open Sunday through Thursday, 09:00 AM – 05:00 PM for student academic advising, thesis consultation, and administrative support.
        </p>
        <div className="pt-2">
          <Link to="/contact">
            <Button variant="primary" size="md">
              Contact Advising Desk
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
