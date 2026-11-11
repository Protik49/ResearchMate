import React from 'react';
import { Mail, MapPin, Phone, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-left">
      
      {/* Page Header */}
      <div className="space-y-2">
        <Badge variant="neutral">Student Services & Advising</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Department Contact & Advising Desk
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
          Submit questions regarding course advising, faculty consultation hours, thesis supervisor matching, or exam schedule issues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Contact Info Specs */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Department Office
            </h3>
            
            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
                <span>Level 7, Building UB-07, 66 Mohakhali, Dhaka 1212</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>cse.department@bracu.ac.bd</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span>+880-2-222264051 Ext: 401</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
                <span>Sun – Thu: 09:00 AM – 05:00 PM (Closed on Fri/Sat)</span>
              </div>
            </div>
          </Card>

          <Card className="space-y-2 bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200/70 dark:border-zinc-700/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>Direct Database Ingestion</span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              All messages submitted through this portal are directly recorded into the Supabase academic inquiry register.
            </p>
          </Card>
        </div>

        {/* Right: Working Contact Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
              Submit an Academic Inquiry
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-normal">
              Fill in your student credentials and details. The department coordinator will reply within 1 business day.
            </p>
            <ContactForm />
          </Card>
        </div>

      </div>

    </div>
  );
}
