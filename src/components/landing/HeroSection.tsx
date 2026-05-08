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
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white">

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

          {/* ── Centered Content ── */}
          <div className="text-center mb-8">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/70 rounded-full text-xs font-semibold text-blue-700 mb-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span>Compliance-First Workforce Platform for UK Care Providers</span>
            </motion.div>

            {/* Headline - Much Smaller */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 mb-4 px-4"
            >
              Reduce Agency Costs &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Ensure 100% Workforce Compliance
              </span>
              <span className="block mt-1.5">in one platform.</span>
            </motion.h1>

            {/* Professional Healthcare Image - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative max-w-2xl mx-auto mb-5"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-slate-200/50 bg-white">
                <Image
                  src="/hero-healthcare.png"
                  alt="Healthcare professionals using Staffist platform"
                  width={700}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none" />
              </div>
              
              {/* Floating badge - 100% Compliant - Smaller */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute bottom-3 left-3 bg-white rounded-md shadow-lg border border-slate-200/60 px-2.5 py-1.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">100% Compliant</p>
                  <p className="text-[9px] text-slate-600">Real-time tracking</p>
                </div>
              </motion.div>

              {/* Floating stat badge - 40% Savings - Smaller */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                className="absolute top-3 right-3 bg-white rounded-md shadow-lg border border-slate-200/60 px-2.5 py-1.5 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-tight">40% Savings</p>
                  <p className="text-[9px] text-slate-600">On agency costs</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Subtitle - Smaller and Concise */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm md:text-base leading-relaxed text-slate-600 max-w-xl mx-auto mb-5 px-4"
            >
              Automate compliance tracking, allocate shifts to eligible staff only, and eliminate costly agency dependency.
            </motion.p>

            {/* CTAs - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button
                onClick={() => setShowBookDemo(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-6 h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span className="relative flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book a Demo
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                onClick={() => setShowJoinPilot(true)}
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-lg px-6 h-10 text-sm font-semibold transition-all"
              >
                Join Pilot Programme
                <ArrowRight className="w-3.5 h-3.5 ml-2 text-blue-600" />
              </Button>
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
