"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  CalendarPlus,
  MessageSquare,
  Download,
  BookOpen,
  CheckCircle2,
  Briefcase,
  Shield,
  Heart,
  TrendingUp,
  Star,
  CalendarDays,
  Globe,
  Clock,
  Award,
  Users,
} from "lucide-react";
import type { PageView } from "@/components/admin/dashboard/admin-sidebar";

interface CandidateProfilePageProps {
  onBack: () => void;
}

/* ─── Data ─── */

const certifications = [
  "Advanced Life Support (ALS)",
  "Critical Care Nursing",
  "Infection Prevention & Control",
];

const specializations = [
  "Intensive Care",
  "Emergency Medicine",
  "Cardiac Care",
  "Trauma Care",
];

const placements = [
  {
    hospital: "King's College Hospital NHS Foundation Trust",
    role: "Senior ICU Nurse",
    period: "2020–2023",
    years: "3 years",
  },
  {
    hospital: "Royal Free London NHS Foundation Trust",
    role: "ICU Nurse",
    period: "2018–2020",
    years: "2 years",
  },
];

const complianceItems = [
  {
    label: "Enhanced DBS Check",
    status: "Verified",
    valid: "Until Dec 2025",
    color: "emerald" as const,
  },
  {
    label: "Right to Work",
    status: "UK Citizen",
    valid: "Permanent",
    color: "emerald" as const,
  },
  {
    label: "NMC Registration",
    status: "Active",
    valid: "Until Mar 2026",
    color: "emerald" as const,
  },
  {
    label: "Professional Indemnity",
    status: "RCN Coverage",
    valid: "Until Jun 2025",
    color: "blue" as const,
  },
];

const availability = [
  { day: "Mon", date: "15", available: true },
  { day: "Tue", date: "16", available: true },
  { day: "Wed", date: "17", available: false },
  { day: "Thu", date: "18", available: true },
  { day: "Fri", date: "19", available: true },
];

const nhsTraining = [
  "NHS Values & Culture",
  "Patient Safety Protocols",
  "Digital Systems Training",
  "Equality & Diversity",
];

/* ─── Component ─── */

export function AdminCandidateProfilePage({ onBack }: CandidateProfilePageProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto">
      {/* ─── Back Navigation ─── */}
      <div className="animate-fade-in-up">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 -ml-1 px-1 py-0.5 rounded-md hover:bg-muted/50"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="font-medium">Back to Staff Requests</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PROFILE HEADER
         ═══════════════════════════════════════════════════════════ */}
      <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-2xl bg-card overflow-hidden" style={{ animationDelay: "60ms" }}>
        {/* Gradient Banner */}
        <div className="relative h-36 sm:h-44 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 overflow-hidden">
          {/* Subtle mesh overlay pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(255,255,255,0.15) 0%, transparent 45%)`,
          }} />
          {/* Subtle grid lines */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <CardContent className="relative px-5 sm:px-8 pb-8">
          {/* Avatar + Identity Row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 relative z-10">
            {/* Avatar */}
            <Avatar className="w-[88px] h-[88px] ring-[5px] ring-white dark:ring-gray-900 shadow-xl flex-shrink-0 border-2 border-blue-200/60">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white text-2xl font-bold tracking-tight">
                SM
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-2">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                {/* Name + Metadata */}
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight leading-tight">
                    Sarah Mitchell
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Registered Nurse — ICU Specialist&ensp;·&ensp;8 years experience
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <Badge
                      variant="secondary"
                      className="bg-muted/70 text-muted-foreground text-xs font-medium gap-1.5 px-3 py-1 rounded-lg"
                    >
                      <MapPin className="w-3 h-3" />
                      London, UK
                    </Badge>
                    <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-semibold px-3 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available Now
                    </Badge>
                  </div>
                </div>

                {/* AI Compatibility Score */}
                <div className="self-start bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-100/80 dark:border-blue-800/30 rounded-xl px-5 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      AI Match
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold gradient-text leading-none">
                      96%
                    </span>
                    <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                      Excellent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <Separator className="my-5 bg-border/40" />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2.5">
            <Button
              size="sm"
              className="h-9 px-4 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white gap-2 rounded-lg shadow-sm shadow-blue-600/20 transition-all duration-200 hover:shadow-md hover:shadow-blue-600/25"
            >
              <CalendarPlus className="w-4 h-4" />
              Invite to Shift
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 text-sm font-medium gap-2 rounded-lg border-border/60 hover:bg-muted/60 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 text-sm font-medium gap-2 rounded-lg border-border/60 hover:bg-muted/60 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════
          TWO-COLUMN LAYOUT
         ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─── Left Column (2 cols) ─── */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Qualifications & Experience ── */}
          <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-xl bg-card" style={{ animationDelay: "120ms" }}>
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200/40 dark:border-blue-800/30">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Qualifications &amp; Experience
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Professional credentials and clinical background</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5 space-y-6">
              {/* Certifications */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Certifications
                </p>
                <div className="space-y-2.5">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors duration-150"
                    >
                      <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Clinical Specializations */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Clinical Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-blue-50/80 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 hover:bg-blue-100/80 dark:hover:bg-blue-950/50 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-200/50 dark:border-blue-800/30 transition-colors duration-150"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Previous NHS Placements */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Previous NHS Placements
                </p>
                <div className="space-y-3">
                  {placements.map((p, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/40 hover:border-border/70 hover:bg-muted/30 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200/40 dark:border-blue-800/30 mt-0.5 flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-150">
                          {p.hospital}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                          {p.role}&ensp;·&ensp;{p.period}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-medium flex-shrink-0 border-border/50 rounded-lg px-2.5 py-1 mt-0.5"
                      >
                        {p.years}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Compliance Status ── */}
          <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-xl bg-card" style={{ animationDelay: "180ms" }}>
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/20 border border-emerald-200/40 dark:border-emerald-800/30">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Compliance Status
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">All required checks and registrations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5">
              <div className="space-y-3">
                {complianceItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 hover:border-border/70 bg-muted/10 hover:bg-muted/20 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                        item.color === "emerald"
                          ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/30"
                          : "bg-blue-50 dark:bg-blue-950/30 border-blue-200/50 dark:border-blue-800/30"
                      }`}>
                        <CheckCircle2 className={`w-4 h-4 ${
                          item.color === "emerald"
                            ? "text-emerald-500"
                            : "text-blue-500"
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                          {item.status}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs font-medium px-3 py-1 flex-shrink-0 ml-3 rounded-lg border ${
                        item.color === "emerald"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40"
                      }`}
                    >
                      {item.valid}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Ethical Recruitment Banner ── */}
          <Card className="animate-fade-in-up border border-emerald-200/50 dark:border-emerald-800/30 card-elevated rounded-xl bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/60 dark:from-emerald-950/20 dark:via-gray-900 dark:to-blue-950/20 overflow-hidden relative" style={{ animationDelay: "240ms" }}>
            <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-emerald-100/30 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-tr-full pointer-events-none" />
            <CardContent className="p-6 flex items-start gap-4 relative z-10">
              <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-emerald-200/50 dark:border-emerald-800/30 shadow-sm flex-shrink-0">
                <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground tracking-tight">
                  Ethical Recruitment Commitment
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  No recruitment fees charged to professionals — ethically sourced and fully compliant with NHS and international recruitment standards.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Right Column (1 col) ─── */}
        <div className="space-y-6">

          {/* ── Performance Metrics ── */}
          <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-xl bg-card" style={{ animationDelay: "150ms" }}>
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200/40 dark:border-blue-800/30">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Performance
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Last 12 months</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5 space-y-5">
              {/* Shift count hero stat */}
              <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-xl border border-blue-100/60 dark:border-blue-800/30">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CalendarDays className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Completed Shifts
                  </span>
                </div>
                <p className="text-4xl font-extrabold gradient-text leading-none mt-2">
                  47
                </p>
              </div>

              {/* Shift Completion Rate */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Shift Completion
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    98%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-primary/10 overflow-hidden">
                  <div
                    className="progress-animated h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>

              {/* Patient Feedback Score */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Patient Feedback
                  </span>
                  <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    4.9<span className="text-xs font-medium text-muted-foreground">/5</span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-primary/10 overflow-hidden">
                  <div
                    className="progress-animated h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                    style={{ width: "98%" }}
                  />
                </div>
              </div>

              {/* Reliability Score */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/40">
                <span className="text-xs font-medium text-muted-foreground">
                  Reliability
                </span>
                <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs font-semibold px-3 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* ── Availability Calendar ── */}
          <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-xl bg-card" style={{ animationDelay: "210ms" }}>
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200/40 dark:border-blue-800/30">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-[15px] font-semibold tracking-tight">
                      Availability
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">This week</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                  4 of 5 open
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5">
              <div className="grid grid-cols-5 gap-2">
                {availability.map((slot, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-200 cursor-default ${
                      slot.available
                        ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-950/30 hover:shadow-sm"
                        : "bg-muted/30 border-border/40 opacity-50"
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {slot.day}
                    </span>
                    <span className="text-lg font-bold text-foreground mt-0.5 leading-none">
                      {slot.date}
                    </span>
                    <span
                      className={`text-[10px] font-semibold mt-1.5 uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        slot.available
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/30"
                          : "text-muted-foreground line-through"
                      }`}
                    >
                      {slot.available ? "Open" : "Booked"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Language & NHS Readiness ── */}
          <Card className="animate-fade-in-up border border-border/50 card-elevated rounded-xl bg-card" style={{ animationDelay: "270ms" }}>
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200/40 dark:border-blue-800/30">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Language &amp; NHS Readiness
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Skills and training modules</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-5 space-y-5">
              {/* Language Skills */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Language Skills
                </p>
                <div className="space-y-2">
                  <Badge className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200/50 dark:border-blue-800/30 gap-1.5">
                    <Globe className="w-3 h-3" />
                    English (Native C2)
                  </Badge>
                  <div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border-border/60 gap-1.5"
                    >
                      <Globe className="w-3 h-3" />
                      Spanish B2
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* NHS Training Modules */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  NHS Training Modules
                </p>
                <div className="space-y-2">
                  {nhsTraining.map((module, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {module}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-border/40" />

              {/* Readiness Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-100/50 dark:border-blue-800/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-200/40 dark:border-blue-800/30 shadow-sm">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      NHS Ready
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      All mandatory training completed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
