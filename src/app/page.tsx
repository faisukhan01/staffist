'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import SignInPage from '@/components/auth/SignInPage';
import SignUpPage from '@/components/auth/SignUpPage';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import MyShiftsContent from '@/components/dashboard/MyShiftsContent';
import ComplianceContent from '@/components/dashboard/ComplianceContent';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const contentVariants = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

export default function Home() {
  const { currentPage, sidebarTab } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      {/* ── Landing Page ── */}
      {currentPage === 'landing' && (
        <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <CTASection />
          </main>
          <Footer />
        </motion.div>
      )}

      {/* ── Sign In ── */}
      {currentPage === 'signin' && (
        <motion.div key="signin" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <SignInPage />
        </motion.div>
      )}

      {/* ── Sign Up ── */}
      {currentPage === 'signup' && (
        <motion.div key="signup" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <SignUpPage />
        </motion.div>
      )}

      {/* ── App Shell (Dashboard / Shifts / Compliance) ── */}
      {(currentPage === 'dashboard' || currentPage === 'compliance') && (
        <motion.div key="app" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex min-h-screen">
          <Sidebar />
          <div className="md:ml-[220px] flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {sidebarTab === 'compliance' ? (
                <motion.div key="compliance" variants={contentVariants} initial="initial" animate="animate" exit="exit">
                  <ComplianceContent />
                </motion.div>
              ) : sidebarTab === 'shifts' ? (
                <motion.div key="shifts" variants={contentVariants} initial="initial" animate="animate" exit="exit">
                  <MyShiftsContent />
                </motion.div>
              ) : (
                <motion.div key="dashboard" variants={contentVariants} initial="initial" animate="animate" exit="exit">
                  <DashboardContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
