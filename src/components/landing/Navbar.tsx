'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const { navigateTo, isAuthenticated } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/70"
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-[80px] flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigateTo(isAuthenticated ? 'dashboard' : 'landing')}
        >
          <Image
            src="/logo.png"
            alt="Staffist"
            width={250}
            height={166}
            className="w-[180px] h-auto object-contain"
            priority
          />
        </div>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-1">
          {['Compliance', 'International Recruitment'].map((label) => (
            <button
              key={label}
              className="group relative px-4 py-2 text-[13.5px] font-medium text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-50"
            >
              {label}
              <span className="absolute bottom-1.5 left-4 right-4 h-[1.5px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
            </button>
          ))}
        </div>

        {/* Desktop right CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            onClick={() => navigateTo('signin')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-[9px] px-5 h-[38px] text-[13px] font-semibold shadow-[0_1px_3px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 pb-5"
        >
          <div className="flex flex-col gap-1 pt-3">
            {['Compliance', 'International Recruitment'].map((l) => (
              <button
                key={l}
                className="text-[13.5px] font-medium text-slate-500 hover:text-slate-900 py-2.5 text-left px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {l}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
              <Button
                onClick={() => { navigateTo('signin'); setMenuOpen(false); }}
                className="w-full h-[44px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13.5px] font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
