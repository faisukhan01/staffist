'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, CalendarClock, ShieldCheck, LogOut, X } from 'lucide-react';
import Image from 'next/image';

const mainNav = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'shifts' as const, label: 'My Shifts', icon: CalendarClock },
  { id: 'compliance' as const, label: 'Compliance', icon: ShieldCheck },
];

export default function Sidebar() {
  const { sidebarTab, setSidebarTab, signOut, sidebarOpen, setSidebarOpen } = useAppStore();

  const navContent = (
    <>
      {/* Logo */}
      <div className="h-[72px] flex items-center px-5 border-b border-[#F1F5F9] shrink-0">
        <Image
          src="/logo.png"
          alt="Staffist"
          width={480}
          height={144}
          className="w-[160px] h-auto object-contain"
          priority
        />
        {/* Close button — mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 pt-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const active = sidebarTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSidebarTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[13.5px] font-medium transition-all duration-150 ${
                  active
                    ? 'bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]'
                }`}
              >
                <item.icon className="w-[17px] h-[17px] shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="border-t border-[#F1F5F9] p-3 shrink-0">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[13px] font-medium text-[#94A3B8] hover:bg-[#F8FAFC] hover:text-[#64748B] transition-all"
        >
          <LogOut className="w-[16px] h-[16px]" strokeWidth={1.8} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on md+ */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex w-[220px] h-screen bg-white border-r border-[#E8ECF1] flex-col fixed left-0 top-0 z-40"
      >
        {navContent}
      </motion.aside>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar — slide in from left */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-[#E8ECF1] flex flex-col z-50 shadow-xl"
          >
            {navContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
