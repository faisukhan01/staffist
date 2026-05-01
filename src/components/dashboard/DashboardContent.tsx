'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, AlertTriangle, CalendarDays, Bell, Star,
  CheckCircle2, ChevronRight, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import Image from 'next/image';
import { ApplyShiftDialog } from '@/components/dialogs/ApplyShiftDialog';

const CARE_HOME = {
  name: 'Sunrise Care Home',
  location: 'Manchester, M14 6HR',
};

const complianceItems = [
  { title: 'DBS Check',            status: 'Valid',              detail: 'Enhanced DBS',      ok: true  },
  { title: 'Right to Work',        status: 'Valid',              detail: 'Until Dec 2025',    ok: true  },
  { title: 'Manual Handling Cert', status: 'Expires in 32 days', detail: 'Renewal due soon',  ok: false },
  { title: 'First Aid Certificate', status: 'Valid',             detail: 'Until Mar 2026',    ok: true  },
];

const upcomingShifts = [
  { dept: 'Dementia Unit',    role: 'Care Assistant', date: 'Apr 25, 2025', time: '07:00 – 19:00', status: 'Confirmed' as const },
  { dept: 'General Care',     role: 'Care Assistant', date: 'Apr 28, 2025', time: '19:00 – 07:00', status: 'Pending'   as const },
];

const availableShifts = [
  { dept: 'Memory Care',  role: 'Senior Carer',   rate: '£15.00/hr', date: 'Thu, 1 May',  time: '07:00 – 19:00' },
  { dept: 'Nursing Wing', role: 'Care Assistant', rate: '£14.00/hr', date: 'Sat, 3 May',  time: '22:00 – 07:00' },
];


const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardSpring = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
};

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
});

export default function DashboardContent() {
  const { setSidebarTab, setSidebarOpen } = useAppStore();
  const [available, setAvailable] = useState(true);
  const [showApplyShift, setShowApplyShift] = useState(false);
  const [selectedShift, setSelectedShift] = useState<typeof availableShifts[0] | null>(null);

  const handleApplyShift = (shift: typeof availableShifts[0]) => {
    setSelectedShift(shift);
    setShowApplyShift(true);
  };

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

      <div className="px-4 md:px-8 xl:px-12 py-6 md:py-8 max-w-[1100px] mx-auto space-y-5 md:space-y-7">

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
                <p className="text-blue-200 text-sm mt-0.5">Senior Care Assistant · Dementia Unit</p>
                <p className="text-blue-300 text-xs mt-0.5">{CARE_HOME.name} · Manchester</p>
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

        {/* Compliance Status */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.14)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Compliance Status</h3>
            <button onClick={() => setSidebarTab('compliance')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={container} initial="hidden" animate="visible">
            {complianceItems.map((c, i) => (
              <motion.div
                key={i}
                variants={cardSpring}
                whileHover={{ y: -4, boxShadow: c.ok ? '0 12px 32px rgba(0,0,0,0.09)' : '0 12px 32px rgba(245,158,11,0.15)', transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className={`group relative bg-white rounded-xl border p-5 cursor-default overflow-hidden ${c.ok ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  {c.ok
                    ? <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
                    : <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-500" /></motion.div>
                  }
                  <div className={`w-2 h-2 rounded-full ${c.ok ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ boxShadow: c.ok ? '0 0 6px rgba(52,211,153,0.8)' : '0 0 6px rgba(251,191,36,0.8)' }} />
                </div>
                <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                <p className={`text-sm font-medium mt-0.5 ${c.ok ? 'text-emerald-600' : 'text-amber-600'}`}>{c.status}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.detail}</p>
                {/* Bottom sweep line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left ${c.ok ? 'from-emerald-400 to-teal-400' : 'from-amber-400 to-orange-400'}`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Two-column: Upcoming + Available */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming Shifts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.18)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Upcoming Shifts</h3>
              <button onClick={() => setSidebarTab('shifts')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <motion.div className="space-y-3" variants={container} initial="hidden" animate="visible">
              {upcomingShifts.map((s, i) => (
                <motion.div
                  key={i}
                  variants={cardSpring}
                  whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(37,99,235,0.1)', transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  className="group relative bg-white rounded-xl border border-slate-200 p-5 cursor-default overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.dept}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.role} · {CARE_HOME.name}</p>
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
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Available Shifts */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp(0.22)}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Matching Shifts</h3>
              <button onClick={() => setSidebarTab('shifts')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors">
                Browse all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <motion.div className="space-y-3" variants={container} initial="hidden" animate="visible">
              {availableShifts.map((s, i) => (
                <motion.div
                  key={i}
                  variants={cardSpring}
                  whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(37,99,235,0.1)', transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  className="group relative bg-white rounded-xl border border-slate-200 p-5 cursor-default overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{s.dept}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.role} · {CARE_HOME.name}</p>
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
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleApplyShift(s)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold px-4 h-8 shrink-0 transition-colors"
                      >
                        Apply
                      </Button>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500 scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Dialogs */}
      <ApplyShiftDialog 
        open={showApplyShift} 
        onClose={() => {
          setShowApplyShift(false);
          setSelectedShift(null);
        }}
        shift={selectedShift ? {
          ...selectedShift,
          location: CARE_HOME.name + ' · ' + CARE_HOME.location
        } : null}
      />
    </div>
  );
}
