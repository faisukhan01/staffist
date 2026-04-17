'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardContent from '@/components/dashboard/DashboardContent';
import MyShiftsContent from '@/components/dashboard/MyShiftsContent';
import ComplianceContent from '@/components/dashboard/ComplianceContent';
import AnimatedLoginPage from '@/components/AnimatedLoginPage';

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
  const { currentPage, sidebarTab, isAuthenticated, authRole, navigateTo } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // If admin is authenticated, redirect them to /admin immediately
  useEffect(() => {
    if (!mounted) return;
    if (isAuthenticated && authRole === 'admin') {
      router.replace('/admin');
    }
  }, [mounted, isAuthenticated, authRole, router]);

  // Guard unauthenticated access to protected pages
  useEffect(() => {
    if (!mounted) return;
    if (isAuthenticated && authRole === 'admin') return; // handled above
    const validPages = ['landing', 'signin', 'dashboard', 'compliance'];
    if (!validPages.includes(currentPage)) {
      navigateTo('landing');
      return;
    }
    if (!isAuthenticated && currentPage !== 'landing' && currentPage !== 'signin') {
      navigateTo('landing');
    }
  }, [mounted, isAuthenticated, authRole, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

  // Prevent flash before hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    );
  }

  // Admin users should never see the user side — show blank while redirecting
  if (isAuthenticated && authRole === 'admin') {
    return null;
  }

  const validPages = ['landing', 'signin', 'dashboard', 'compliance'];
  const safePage = !validPages.includes(currentPage)
    ? 'landing'
    : !isAuthenticated && currentPage !== 'landing' && currentPage !== 'signin'
    ? 'landing'
    : currentPage;

  return (
    <AnimatePresence mode="wait">
      {/* ── Sign In Page ── */}
      {safePage === 'signin' && (
        <motion.div key="signin" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <AnimatedLoginPage />
        </motion.div>
      )}

      {/* ── Landing Page ── */}
      {safePage === 'landing' && (
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

      {/* ── User App Shell (Dashboard / Shifts / Compliance) ── */}
      {(safePage === 'dashboard' || safePage === 'compliance') && (
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
