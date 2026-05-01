'use client';

import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Globe } from 'lucide-react';

const features = [
  {
    num: '01',
    icon: Brain,
    title: 'AI-Driven Shift Matching',
    desc: 'Intelligent algorithms match healthcare professionals to shifts based on skills, availability, and location for optimal staffing efficiency.',
    iconBg: 'bg-blue-50',
    iconGlow: 'rgba(37,99,235,0.25)',
    iconColor: 'text-blue-600',
    accentColor: 'from-blue-500 to-indigo-500',
    borderHover: 'hover:border-blue-200',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'Automated Compliance Management',
    desc: 'Real-time tracking of DBS checks, Right to Work documentation, and professional certifications to ensure 100% regulatory compliance.',
    iconBg: 'bg-emerald-50',
    iconGlow: 'rgba(16,185,129,0.25)',
    iconColor: 'text-emerald-600',
    accentColor: 'from-emerald-500 to-teal-500',
    borderHover: 'hover:border-emerald-200',
  },
  {
    num: '03',
    icon: Globe,
    title: 'Ethical International Recruitment',
    desc: 'Transparent, ethical recruitment of international healthcare professionals with full visa and qualification support.',
    iconBg: 'bg-violet-50',
    iconGlow: 'rgba(139,92,246,0.25)',
    iconColor: 'text-violet-600',
    accentColor: 'from-violet-500 to-purple-500',
    borderHover: 'hover:border-violet-200',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 220, damping: 22 },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[700px] mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700 mb-4"
          >
            Why Staffist
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Intelligent Healthcare Staffing Solutions
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Advanced AI technology meets regulatory compliance for seamless healthcare staffing
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                y: -8,
                boxShadow: `0 24px 60px ${f.iconGlow}`,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${f.borderHover} transition-colors duration-300 overflow-hidden cursor-default`}
            >
              {/* Shimmer sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
              />

              {/* Number watermark */}
              <div className="absolute top-6 right-7 text-[11px] font-bold text-slate-200 tracking-[0.15em] font-mono select-none group-hover:text-slate-300 transition-colors duration-300">
                {f.num}
              </div>

              {/* Icon with glow */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-6`}
                style={{ boxShadow: 'none' }}
              >
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </motion.div>

              <h3 className="text-[16px] font-semibold text-slate-900 mb-3 leading-snug">{f.title}</h3>
              <p className="text-[14px] text-slate-500 leading-[1.7]">{f.desc}</p>

              {/* Bottom gradient accent line — always visible on mobile, hover-animated on desktop */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accentColor} scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-b-2xl`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
