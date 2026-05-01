'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Zap, Building2, Globe } from 'lucide-react';
import { BookDemoDialog } from '@/components/dialogs/BookDemoDialog';
import { ContactSalesDialog } from '@/components/dialogs/ContactSalesDialog';

const plans = [
  {
    name: 'Starter',
    price: '£299',
    period: '/month',
    tag: 'Perfect for small care homes getting started with compliance management.',
    icon: Building2,
    features: [
      'Automated compliance tracking (DBS, Right to Work, etc.)',
      'Staff document management',
      'Real-time compliance alerts',
      'Basic workforce dashboard',
    ],
    btn: 'Start Free Trial',
    popular: false,
    accent: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Growth',
    price: '£699',
    period: '/month',
    tag: 'Ideal for growing care providers managing multiple teams and shifts.',
    icon: Zap,
    features: [
      'Everything in Starter',
      'Smart shift allocation to compliant staff',
      'Automated notifications & reminders',
      'Workforce visibility & reporting',
    ],
    btn: 'Book a Demo',
    popular: true,
    accent: 'from-blue-600 to-indigo-500',
  },
  {
    name: 'Professional',
    price: '£1,500',
    period: '/month',
    tag: 'Built for multi-site care providers needing centralised control.',
    icon: Globe,
    features: [
      'Everything in Growth',
      'Multi-location management dashboard',
      'Advanced compliance risk insights',
      'Centralised workforce visibility',
    ],
    btn: 'Book a Demo',
    popular: false,
    accent: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: ' pricing',
    tag: 'Designed for large healthcare groups with multiple care home locations.',
    icon: Star,
    features: [
      'Scalable multi-site management',
      'Organisation-wide compliance monitoring',
      'Advanced analytics & reporting',
      'Dedicated account support',
    ],
    scalingNote: 'Scalable pricing based on number of care homes',
    btn: 'Contact Sales',
    popular: false,
    accent: 'from-amber-500 to-orange-500',
  },
];

export default function PricingSection() {
  const { navigateTo } = useAppStore();
  const [showBookDemo, setShowBookDemo] = useState(false);
  const [showContactSales, setShowContactSales] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanClick = (planName: string, isEnterprise: boolean) => {
    if (isEnterprise) {
      setSelectedPlan(planName);
      setShowContactSales(true);
    } else {
      setShowBookDemo(true);
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-20 relative overflow-hidden" style={{ background: '#F8FAFD' }}>
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.028) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Top radial */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 65%)' }}
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
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Simple, Transparent Pricing for Care Providers
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Reduce agency costs and ensure workforce compliance — all in one platform.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {plans.map((p, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 32, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
              }}
              whileHover={{
                y: -6,
                transition: { type: 'spring', stiffness: 300, damping: 18 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-default h-full ${
                p.popular
                  ? 'border-2 border-blue-300/70 bg-white shadow-[0_8px_30px_rgba(37,99,235,0.15)] ring-2 ring-blue-100/50'
                  : 'border border-slate-200/80 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
              }`}
            >
              <div className="p-6 flex-1 flex flex-col">
                {/* Most Popular badge */}
                {p.popular && (
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-full shadow-lg shadow-blue-500/30 relative overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                      <Star className="w-3 h-3 fill-white relative z-10" />
                      <span className="text-[10.5px] font-bold uppercase tracking-wider relative z-10">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${p.popular ? 'bg-blue-600' : 'bg-slate-100'}`}
                >
                  <p.icon className={`w-5 h-5 ${p.popular ? 'text-white' : 'text-slate-400'}`} />
                </motion.div>

                <h3 className="text-[15px] font-bold text-slate-900 mb-1.5">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-[28px] font-bold tracking-[-0.025em] ${p.popular ? 'text-blue-600' : 'text-slate-900'}`}>
                    {p.price}
                  </span>
                  <span className="text-[13px] text-slate-400">{p.period}</span>
                </div>
                <p className="text-[12.5px] text-slate-500 mb-5 leading-relaxed">{p.tag}</p>

                <ul className="space-y-2.5 mb-5 flex-1">
                  {p.features.map((f, fi) => (
                    <motion.li
                      key={fi}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + fi * 0.06, duration: 0.35 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 mt-[1px] ${p.popular ? 'bg-blue-100' : 'bg-slate-100'}`}>
                        <Check className={`w-2.5 h-2.5 ${p.popular ? 'text-blue-600' : 'text-slate-500'}`} />
                      </div>
                      <span className="text-[13px] text-slate-600 leading-snug">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                {'scalingNote' in p && p.scalingNote && (
                  <p className="text-[11.5px] text-slate-400 italic mb-4">{p.scalingNote}</p>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mt-auto">
                  <Button
                    onClick={() => handlePlanClick(p.name, p.name === 'Enterprise')}
                    className={`w-full rounded-xl h-[44px] text-[13px] font-semibold transition-all ${
                      p.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)]'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {p.btn}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </motion.div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.accent} scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dialogs */}
      <BookDemoDialog open={showBookDemo} onClose={() => setShowBookDemo(false)} />
      <ContactSalesDialog 
        open={showContactSales} 
        onClose={() => {
          setShowContactSales(false);
          setSelectedPlan('');
        }}
        planName={selectedPlan}
      />
    </section>
  );
}
