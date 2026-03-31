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
    iconColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-100',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(37,99,235,0.09)]',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'Automated Compliance Management',
    desc: 'Real-time tracking of DBS checks, Right to Work documentation, and professional certifications to ensure 100% regulatory compliance.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-100',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(16,185,129,0.09)]',
  },
  {
    num: '03',
    icon: Globe,
    title: 'Ethical International Recruitment',
    desc: 'Transparent, ethical recruitment of international healthcare professionals with full visa and qualification support.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    hoverBorder: 'hover:border-violet-100',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(139,92,246,0.09)]',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-[110px] bg-white relative overflow-hidden">
      {/* Subtle bottom radial */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-[600px] mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[12px] font-semibold text-blue-700 mb-5">
            Why Staffist
          </span>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.65rem)] font-bold text-slate-900 tracking-[-0.025em] mb-4 leading-[1.15]">
            Intelligent Healthcare Staffing Solutions
          </h2>
          <p className="text-[16px] text-slate-500 leading-[1.7]">
            Advanced AI technology meets regulatory compliance for seamless healthcare staffing
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className={`group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${f.hoverShadow} ${f.hoverBorder} hover:border transition-all duration-300`}
            >
              {/* Number watermark */}
              <div className="absolute top-6 right-7 text-[11px] font-bold text-slate-200 tracking-[0.15em] font-mono select-none">
                {f.num}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>

              <h3 className="text-[16px] font-semibold text-slate-900 mb-3 leading-snug">{f.title}</h3>
              <p className="text-[14px] text-slate-500 leading-[1.7]">{f.desc}</p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-7 right-7 h-[2px] ${f.iconBg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
