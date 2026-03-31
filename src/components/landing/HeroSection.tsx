'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Users, Globe, TrendingUp, Star } from 'lucide-react';
import Image from 'next/image';

const heroStats = [
  { value: '2,500+', label: 'Professionals' },
  { value: '500+',   label: 'NHS Trust Partners' },
  { value: '99.8%',  label: 'Compliance Rate' },
  { value: '4.9/5',  label: 'Average Rating' },
];

export default function HeroSection() {
  const { navigateTo } = useAppStore();

  return (
    <section className="relative pt-[130px] pb-[110px] overflow-hidden bg-white">

      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot/grid pattern */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Top radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.11) 0%, transparent 68%)' }}
        />
        {/* Animated orb top-right */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-180px] right-[-80px] w-[700px] h-[700px] bg-blue-400/20 rounded-full blur-[120px]"
        />
        {/* Animated orb bottom-left */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-[-100px] left-[-80px] w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* ── Left: Text ── */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 rounded-full text-[12px] font-semibold text-blue-700 mb-7 shadow-sm"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              NHS Compliant &amp; CQC Regulated
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
              className="text-[clamp(2.5rem,5vw,3.8rem)] font-bold leading-[1.07] text-slate-900 tracking-[-0.03em] mb-6"
            >
              AI-Powered Ethical{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Healthcare Staffing
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.85, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[17px] leading-[1.72] text-slate-500 max-w-[500px] mb-9"
            >
              Connect with qualified professionals quickly and compliantly.
              Streamline your NHS and private healthcare staffing needs.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button
                onClick={() => navigateTo('signup')}
                className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white rounded-[11px] px-6 h-[50px] text-[14px] font-semibold shadow-[0_2px_8px_rgba(37,99,235,0.3),0_8px_24px_rgba(37,99,235,0.15)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)] transition-all"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-100" />
                <span className="relative flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Register as Healthcare Provider
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              <Button
                onClick={() => navigateTo('signup')}
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-[11px] px-6 h-[50px] text-[14px] font-semibold transition-all"
              >
                <Globe className="w-4 h-4 mr-2 text-blue-600" />
                Join as Healthcare Professional
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex -space-x-2.5">
                {['/avatar-1.png', '/avatar-2.png', '/avatar-3.png', '/avatar-4.png'].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100">
                    <Image src={src} alt="" width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  <span className="text-[12.5px] font-semibold text-slate-800 ml-1">4.9/5</span>
                </div>
                <p className="text-[12px] text-slate-400">Trusted by 2,500+ healthcare professionals</p>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-slate-100/80"
            >
              {heroStats.map((s, i) => (
                <div key={i}>
                  <p className="text-[22px] font-bold text-slate-900 tracking-tight leading-none">{s.value}</p>
                  <p className="text-[12px] text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Image + floating cards ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block mt-[56px]"
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-6 rounded-[32px] blur-3xl opacity-40"
              style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)' }}
            />

            {/* Main image */}
            <div className="relative rounded-[22px] overflow-hidden shadow-[0_28px_80px_-16px_rgba(37,99,235,0.22)] border border-slate-200/60" style={{ height: '560px' }}>
              <Image
                src="/hero-healthcare.png"
                alt="Healthcare professionals"
                width={620}
                height={560}
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/8 to-transparent" />
            </div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-10 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-4 border border-slate-100 min-w-[185px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">100% Compliant</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">All checks verified</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — top right */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-4 -right-10 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-4 border border-slate-100 min-w-[165px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">4.9/5 Rating</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">500+ verified reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
