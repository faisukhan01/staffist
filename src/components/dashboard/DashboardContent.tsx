'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, AlertTriangle, CalendarDays, Bell, Star,
  CheckCircle2, TrendingUp, Briefcase, Shield, ChevronRight, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import Image from 'next/image';

const complianceItems = [
  { title: 'DBS Check',        status: 'Valid',              detail: 'Enhanced DBS',   ok: true  },
  { title: 'Right to Work',    status: 'Valid',              detail: 'Until Dec 2025', ok: true  },
  { title: 'Visa Status',      status: 'Expires in 32 days', detail: 'Tier 2 Visa',    ok: false },
  { title: 'NMC Registration', status: 'Valid',              detail: 'Until Mar 2025', ok: true  },
];

const upcomingShifts = [
  { hospital: "St. Mary's Hospital",   dept: 'ICU Department',       date: 'March 15, 2024', time: '07:00 – 19:00', status: 'Confirmed' as const },
  { hospital: 'Royal London Hospital', dept: 'Emergency Department', date: 'March 18, 2024', time: '19:00 – 07:00', status: 'Pending'   as const },
];

const availableShifts = [
  { hospital: "King's College Hospital", dept: 'ICU · Night Shift',       rate: '£32/hr', date: 'March 20, 2024', time: '19:00 – 07:00' },
  { hospital: "Guy's Hospital",          dept: 'Cardiac Unit · Day Shift', rate: '£28/hr', date: 'March 22, 2024', time: '07:00 – 19:00' },
];

const stats = [
  { label: 'Shifts This Month', value: '12', icon: Briefcase,   color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { label: 'Hours Worked',      value: '144', icon: Clock,       color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Compliance Score',  value: '92%', icon: Shield,      color: 'text-emerald-600',bg: 'bg-emerald-50'},
  { label: 'Avg. Rating',       value: '4.8', icon: TrendingUp,  color: 'text-violet-600', bg: 'bg-violet-50' },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
});

export default function DashboardContent() {
  const { setSidebarTab, setSidebarOpen } = useAppStore();
  const [available, setAvailable] = useState(true);

  return (
    <div className="flex-1 min-h-screen bg-[#F0F4FF]">

      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 h-[72px] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-semibold text-slate-900 tracking-tight truncate">Good Morning, Sarah 👋</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Here's what's happening with your shifts today.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="relative w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors">
            <Bell className="w-[18px] h-[18px] text-slate-500" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-100 shadow-sm">
            <Image src="/avatar-1.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-6 md:py-8 max-w-[1100px] space-y-5 md:space-y-7">

        {/* Profile Banner */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0)}
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #3b82f6 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 90% 50%, rgba(255,255,255,0.12) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 md:px-8 py-5 md:py-6 gap-4">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-white/30 overflow-hidden shadow-xl shrink-0">
                <Image src="/avatar-1.png" alt="Sarah Johnson" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">Sarah Johnson</h2>
                <p className="text-blue-200 text-sm mt-0.5">Registered Nurse · ICU Specialist</p>
                <p className="text-blue-300 text-xs mt-0.5">London, United Kingdom</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {[1,2,3,4].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  <Star className="w-3.5 h-3.5 fill-yellow-400/30 text-yellow-400/50" />
                  <span className="text-blue-100 text-xs ml-1 font-medium">4.8 · 127 reviews</span>
                </div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-4 md:px-5 py-3 flex items-center gap-3 shrink-0 self-start sm:self-auto">
              <div className="text-right">
                <p className="text-white/70 text-xs font-medium">Availability</p>
                <p className={`text-sm font-bold mt-0.5 ${available ? 'text-emerald-300' : 'text-white/50'}`}>
                  {available ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <button
                onClick={() => setAvailable(!available)}
                className={`w-12 h-6 rounded-full transition-colors duration-200 relative shrink-0 ${available ? 'bg-emerald-400' : 'bg-white/20'}`}
              >
                <div className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md transition-transform duration-200 ${available ? 'translate-x-[26px]' : 'translate-x-[3px]'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Alert Banner */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.06)}>
          <div className="flex items-start gap-3 px-4 md:px-5 py-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-900">Action Required</p>
              <p className="text-sm text-amber-700 mt-0.5">Your visa expires in 32 days. Renew it now to keep receiving shift opportunities.</p>
            </div>
            <button className="shrink-0 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors">
              Renew Now
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.1)}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Status */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.14)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Compliance Status</h3>
            <button onClick={() => setSidebarTab('compliance')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceItems.map((c, i) => (
              <div key={i} className={`bg-white rounded-xl border p-5 ${c.ok ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30'}`}>
                <div className="flex items-center justify-between mb-3">
                  {c.ok
                    ? <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                    : <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
                  }
                </div>
                <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                <p className={`text-sm font-medium mt-0.5 ${c.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{c.status}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two-column: Upcoming + Available */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming Shifts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.18)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Upcoming Shifts</h3>
              <button onClick={() => setSidebarTab('shifts')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingShifts.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.hospital}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.dept}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ${
                      s.status === 'Confirmed' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-amber-700 bg-amber-50 border border-amber-200'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-500" />{s.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />{s.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Available Shifts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.22)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Matching Shifts</h3>
              <button onClick={() => setSidebarTab('shifts')} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                Browse all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {availableShifts.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{s.hospital}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.dept}</p>
                    </div>
                    <p className="text-xl font-bold text-blue-600 shrink-0">{s.rate}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarDays className="w-3.5 h-3.5" />{s.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />{s.time}
                      </span>
                    </div>
                    <Button
                      onClick={() => setSidebarTab('shifts')}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold px-4 h-8 shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
