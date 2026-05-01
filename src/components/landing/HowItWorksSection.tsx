'use client';

import { motion } from 'framer-motion';
import { UserPlus, ShieldCheck, CalendarCheck } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Onboard Staff',
    desc: 'Add your workforce and collect all required compliance documents — DBS checks, Right to Work, training certificates — in one secure place.',
    color: 'blue',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    numberBg: 'bg-blue-600',
    iconGlow: 'rgba(37,99,235,0.25)',
    accentColor: 'from-blue-500 to-indigo-500',
    borderHover: 'hover:border-blue-200',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Track Compliance Automatically',
    desc: 'Staffist monitors expiry dates, sends automated alerts, and flags non-compliant staff before they create risk for your organisation.',
    color: 'indigo',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    numberBg: 'bg-indigo-600',
    iconGlow: 'rgba(99,102,241,0.25)',
    accentColor: 'from-indigo-500 to-purple-500',
    borderHover: 'hover:border-indigo-200',
  },
  {
    step: '03',
    icon: CalendarCheck,
    title: 'Allocate Shifts to Eligible Staff',
    desc: 'When a shift needs filling, Staffist shows only compliant, eligible staff — eliminating compliance risk and reducing costly agency dependency.',
    color: 'emerald',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    numberBg: 'bg-emerald-600',
    iconGlow: 'rgba(16,185,129,0.25)',
    accentColor: 'from-emerald-500 to-teal-500',
    borderHover: 'hover:border-emerald-200',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-[700px] mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700 mb-4">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            From Onboarding to Full Compliance in 3 Simple Steps
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            No complexity, no manual tracking — just a clear, automated pathway to workforce compliance.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-[52px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px] hidden md:block">
            <div className="w-full h-full bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200" />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                boxShadow: `0 24px 60px ${s.iconGlow}`,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-center text-center bg-white rounded-2xl p-7 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${s.borderHover} transition-colors duration-300 cursor-default`}
            >
              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
              />

              {/* Step circle with icon */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className={`w-[104px] h-[104px] rounded-full ${s.iconBg} border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center`}
                >
                  <s.icon className={`w-8 h-8 ${s.iconColor}`} />
                </motion.div>
              </div>

              <h3 className="text-[17px] font-bold text-slate-900 mb-3 tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-[14.5px] text-slate-500 leading-[1.7] max-w-[280px]">
                {s.desc}
              </p>

              {/* Bottom gradient accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${s.accentColor} scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-b-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom outcome strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-6 px-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 rounded-2xl border border-blue-100/60"
        >
          {[
            { label: 'Reduce agency spend', icon: '↓' },
            { label: 'Avoid compliance risk', icon: '✓' },
            { label: 'Improve shift coverage', icon: '↑' },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-white border border-blue-100 flex items-center justify-center text-[13px] font-bold text-blue-600 shadow-sm">
                {icon}
              </span>
              <span className="text-[14px] font-semibold text-slate-700">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
