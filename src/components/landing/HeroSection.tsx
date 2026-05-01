'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Star, Lock, CheckCircle, TrendingDown, Calendar } from 'lucide-react';
import Image from 'next/image';
import { BookDemoDialog } from '@/components/dialogs/BookDemoDialog';
import { JoinPilotDialog } from '@/components/dialogs/JoinPilotDialog';

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^([\d,.]+)(.*)$/);
    if (!match) { setDisplayed(value); return; }
    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const prefix = value.startsWith('£') ? '£' : '';
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      const formatted = target >= 1000
        ? Math.round(current).toLocaleString()
        : target % 1 !== 0
          ? current.toFixed(1)
          : Math.round(current).toString();
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-4 py-5 rounded-xl bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1.5"
      >
        {displayed}
      </motion.p>
      <p className="text-xs md:text-sm text-slate-600 font-medium leading-snug">{label}</p>
    </div>
  );
}

const heroStats = [
  { value: '40%',   label: 'Avg agency cost reduction' },
  { value: '99.8%', label: 'Compliance tracking rate' },
  { value: '500+',  label: 'Care providers served' },
  { value: '4.9/5', label: 'Provider satisfaction' },
];

const trustBadges = [
  { icon: Lock,         label: 'GDPR Compliant', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { icon: ShieldCheck,  label: 'ICO Registered', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: CheckCircle,  label: 'CQC Aligned', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { icon: Star,         label: 'Built for UK Care', color: 'text-amber-600', bgColor: 'bg-amber-50' },
];

export default function HeroSection() {
  const { navigateTo } = useAppStore();
  const [showBookDemo, setShowBookDemo] = useState(false);
  const [showJoinPilot, setShowJoinPilot] = useState(false);

  return (
    <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.11) 0%, transparent 68%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-180px] right-[-80px] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-100px] left-[-80px] w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* ── Content ── */}
          <div className="text-center">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/70 rounded-full text-xs sm:text-sm font-semibold text-blue-700 mb-6 md:mb-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Compliance-First Workforce Platform for UK Care Providers</span>
              <span className="sm:hidden">UK Care Workforce Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-4 md:mb-5 px-4"
            >
              Reduce Agency Costs &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Ensure 100% Workforce Compliance
              </span>{' '}
              <span className="block mt-1.5">— in one platform.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto mb-7 md:mb-9 px-4"
            >
              Staffist automates compliance tracking, allocates shifts only to eligible staff, and eliminates costly agency dependency — purpose-built for UK care providers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12 justify-center px-4"
            >
              <Button
                onClick={() => setShowBookDemo(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-6 md:px-8 h-11 md:h-12 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span className="relative flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  Book a Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                onClick={() => setShowJoinPilot(true)}
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl px-6 md:px-8 h-11 md:h-12 text-sm md:text-base font-semibold transition-all"
              >
                Join Pilot Programme
                <ArrowRight className="w-4 h-4 ml-2 text-blue-600" />
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto px-4 mb-12 md:mb-16"
            >
              {heroStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <AnimatedStat value={s.value} label={s.label} />
                </motion.div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-3xl mx-auto px-4"
            >
              {trustBadges.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-slate-600 text-xs md:text-sm font-medium"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Dialogs */}
      <BookDemoDialog open={showBookDemo} onClose={() => setShowBookDemo(false)} />
      <JoinPilotDialog open={showJoinPilot} onClose={() => setShowJoinPilot(false)} />
    </section>
  );
}
