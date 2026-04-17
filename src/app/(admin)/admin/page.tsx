"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { AppShell, type PageView } from "@/components/admin/dashboard/admin-sidebar";
import { AdminDashboardPage } from "@/components/admin/dashboard/admin-dashboard-page";
import { AdminStaffRequestsPage } from "@/components/admin/dashboard/admin-staff-requests-page";
import { AdminCandidateProfilePage } from "@/components/admin/dashboard/admin-candidate-profile-page";
import { AdminCompliancePage } from "@/components/admin/dashboard/admin-compliance-page";
import { AdminAnalyticsPage } from "@/components/admin/dashboard/admin-analytics-page";
import { AdminRegistrationPage } from "@/components/admin/dashboard/admin-registration-page";
import { AdminDashboardSkeleton } from "@/components/admin/dashboard/admin-loading-skeleton";

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -4 },
};

const pageTransition = {
  type: "tween" as const,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  duration: 0.15,
};

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<PageView>("dashboard");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { isAuthenticated, authRole } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Route guard: only admins can access this page
  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated || authRole !== 'admin') {
      router.replace('/');
    }
  }, [mounted, isAuthenticated, authRole, router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Show nothing while checking auth or redirecting
  if (!mounted || !isAuthenticated || authRole !== 'admin') {
    return null;
  }

  const renderPage = () => {
    if (loading) return <AdminDashboardSkeleton />;
    switch (activeView) {
      case "dashboard":
        return <AdminDashboardPage />;
      case "staff-requests":
        return <AdminStaffRequestsPage />;
      case "candidate-profile":
        return (
          <AdminCandidateProfilePage
            onBack={() => setActiveView("staff-requests")}
          />
        );
      case "compliance":
        return <AdminCompliancePage />;
      case "analytics":
        return <AdminAnalyticsPage />;
      case "registration":
        return <AdminRegistrationPage />;
      default:
        return <AdminDashboardPage />;
    }
  };

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
