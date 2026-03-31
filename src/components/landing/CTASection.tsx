'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function CTASection() {
  const { navigateTo } = useAppStore();

  return (
    <section className="py-[110px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] p-12 md:p-16 bg-white shadow-[0_8px_40px_rgba(37,99,235,0.12),0_2px_12px_rgba(37,99,235,0.08)]"
          style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fe 40%, #f5f8ff 100%)' }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.04) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Decorative orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-[-80px] left-[-60px] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[80px] pointer-events-none"
          />

          <div className="relative z-10 max-w-[640px] mx-auto text-center">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-600/10 border border-blue-200 rounded-full text-[12px] font-semibold text-blue-700 mb-6"
            >
              <Sparkles className="w-3 h-3 text-blue-500" />
              Join 2,500+ healthcare professionals
            </motion.div>

            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-slate-900 mb-5 tracking-[-0.025em] leading-[1.15]">
              Ready to Transform Your Healthcare Staffing?
            </h2>
            <p className="text-[16px] text-slate-500 mb-10 leading-[1.72] max-w-[520px] mx-auto">
              Join thousands of healthcare professionals and providers using Staffist for ethical, efficient staffing solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigateTo('signup')}
                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-[11px] px-8 h-[50px] text-[14px] shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.4)] transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-[11px] px-8 h-[50px] text-[14px] font-semibold transition-all bg-white"
              >
                <Calendar className="w-4 h-4 mr-2 opacity-70" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
