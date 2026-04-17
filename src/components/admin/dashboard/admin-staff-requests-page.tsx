"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Eye,
  Star,
  Clock,
  Shield,
  Search,
  CalendarDays,
  MapPin,
  Award,
  PoundSterling,
  BriefcaseMedical,
  Users,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Timer,
  TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════ */

const candidates = [
  {
    name: "Emma Richardson",
    qualification: "RN, IV Certified",
    compliance: "Verified",
    rating: 5.0,
    experience: "5 years",
    availability: "Immediately",
    matchScore: 98,
    recentShifts: 42,
    department: "Emergency",
  },
  {
    name: "James Patterson",
    qualification: "RN, IV Certified",
    compliance: "Verified",
    rating: 4.8,
    experience: "7 years",
    availability: "Immediately",
    matchScore: 95,
    recentShifts: 38,
    department: "Cardiology",
  },
  {
    name: "Olivia Chen",
    qualification: "RN, IV Certified",
    compliance: "Renewal Due",
    rating: 4.9,
    experience: "4 years",
    availability: "2 hours",
    matchScore: 91,
    recentShifts: 29,
    department: "ICU",
  },
  {
    name: "Michael Davies",
    qualification: "RN, BLS Certified",
    compliance: "Verified",
    rating: 4.7,
    experience: "6 years",
    availability: "Tomorrow",
    matchScore: 87,
    recentShifts: 35,
    department: "Surgery",
  },
  {
    name: "Sophie Williams",
    qualification: "RN, IV Certified",
    compliance: "Verified",
    rating: 4.6,
    experience: "3 years",
    availability: "4 hours",
    matchScore: 82,
    recentShifts: 21,
    department: "Pediatrics",
  },
];

const requestStats = [
  {
    label: "Open Requests",
    value: 18,
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    label: "Avg Fill Time",
    value: "4.2h",
    icon: Timer,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    label: "AI Match Rate",
    value: "94%",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    label: "Staff Pool",
    value: 247,
    icon: Users,
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
  },
];

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function getAvatarColor(index: number): string {
  const colors = [
    "from-blue-500 to-blue-600",
    "from-violet-500 to-violet-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
    "from-rose-500 to-rose-600",
  ];
  return colors[index % colors.length];
}

function getMatchScoreColor(score: number): string {
  if (score >= 95) return "from-emerald-500 to-emerald-400";
  if (score >= 90) return "from-blue-500 to-blue-400";
  if (score >= 85) return "from-amber-500 to-amber-400";
  return "from-slate-400 to-slate-300";
}

function getMatchScoreBg(score: number): string {
  if (score >= 95) return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
  if (score >= 90) return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
  if (score >= 85) return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
  return "bg-slate-50 text-slate-700 dark:bg-slate-950/30 dark:text-slate-400";
}

/* ═══════════════════════════════════════════════════════════════
   Stat Card
   ═══════════════════════════════════════════════════════════════ */

function StatCard({ stat, index }: { stat: typeof requestStats[number]; index: number }) {
  const Icon = stat.icon;
  return (
    <Card
      className="border border-border/50 card-stat bg-card rounded-xl animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${stat.color}`}>
            <Icon className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-[20px] font-bold text-foreground tracking-tight leading-none mt-0.5">
              {stat.value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Candidate Card
   ═══════════════════════════════════════════════════════════════ */

function CandidateCard({
  candidate,
  index,
  onAssign,
  onView,
}: {
  candidate: (typeof candidates)[number];
  index: number;
  onAssign: (name: string) => void;
  onView: (name: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isVerified = candidate.compliance === "Verified";

  return (
    <div
      className="p-4 rounded-xl border border-border/40 hover:border-blue-200/70 dark:hover:border-blue-800/40 bg-card/50 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 transition-all duration-200 group animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${index * 70}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: Avatar + Name + Rating + Match Score */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-background shadow-sm">
          <AvatarFallback
            className={`${getAvatarColor(index)} text-white text-[11px] font-bold`}
          >
            {getInitials(candidate.name)}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-foreground truncate">
              {candidate.name}
            </span>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[11px] font-bold text-foreground tabular-nums">
                {candidate.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-muted-foreground truncate">
              {candidate.qualification}
            </span>
            <span className="text-[11px] text-muted-foreground/40">·</span>
            <span className="text-[11px] text-muted-foreground">
              {candidate.experience}
            </span>
          </div>
        </div>

        {/* Match Score */}
        <div className={`flex-shrink-0 px-2 py-1 rounded-lg text-[11px] font-bold tabular-nums ${getMatchScoreBg(candidate.matchScore)}`}>
          {candidate.matchScore}%
        </div>
      </div>

      {/* Match Score Bar */}
      <div className="mt-3 h-1 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getMatchScoreColor(candidate.matchScore)} progress-animated`}
          style={{
            width: `${candidate.matchScore}%`,
            animationDelay: `${index * 70 + 300}ms`,
          }}
        />
      </div>

      {/* Bottom row: Compliance + Availability + Department + Actions */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {/* Compliance Badge */}
          <Badge
            variant="secondary"
            className={
              isVerified
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-medium px-2 py-0.5 h-5 border border-emerald-200/60 dark:border-emerald-800/40"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[10px] font-medium px-2 py-0.5 h-5 border border-amber-200/60 dark:border-amber-800/40"
            }
          >
            <Shield className="w-2.5 h-2.5 mr-1" />
            {candidate.compliance}
          </Badge>

          {/* Availability */}
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{candidate.availability}</span>
          </div>

          {/* Department — hidden on small screens */}
          <span className="text-[11px] text-muted-foreground/70 hidden sm:inline">
            {candidate.department}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAssign(candidate.name);
            }}
            className="h-7 text-[11px] font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg shadow-sm shadow-blue-500/15 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Assign
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onView(candidate.name);
            }}
            className="h-7 text-[11px] text-muted-foreground hover:text-foreground px-2 rounded-lg border-border/50 hover:border-border transition-colors"
          >
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════════ */

export function AdminStaffRequestsPage() {
  const { toast } = useToast();
  const [showMatching] = useState(true);
  const [isMatching] = useState(false);

  const handleAssign = useCallback(
    (name: string) => {
      toast({
        title: "Candidate Assigned",
        description: `${name} has been successfully assigned to the shift.`,
      });
    },
    [toast]
  );

  const handleView = useCallback(
    (name: string) => {
      toast({
        title: "Opening profile...",
        description: `Viewing full profile for ${name}`,
      });
    },
    [toast]
  );

  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-in-up">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-bold text-foreground tracking-tight">
            Staff Requests
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            Create shift requests and match with AI-powered candidate
            recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 rounded-full">
            <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
              AI-Powered
            </span>
          </div>
        </div>
      </div>

      {/* ─── Stats Row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {requestStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* ─── Two-Column Layout ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ═══ Left Column: Shift Creation Form ═══ */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "280ms" }}>
          <CardHeader className="pb-0 px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <BriefcaseMedical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-[15px] font-semibold text-foreground">
                  Create Shift Request
                </CardTitle>
                <CardDescription className="text-[12px] text-muted-foreground mt-0.5">
                  Fill in the details below to find the best matched staff
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-5">
            <div className="space-y-5">
              {/* ── Section: Shift Details ── */}
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-3">
                  Shift Details
                </p>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                  <BriefcaseMedical className="w-3.5 h-3.5 text-muted-foreground" />
                  Role
                </Label>
                <Select defaultValue="rn">
                  <SelectTrigger className="h-9 text-[13px] rounded-lg bg-background">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rn">Registered Nurse</SelectItem>
                    <SelectItem value="hca">Healthcare Assistant</SelectItem>
                    <SelectItem value="physio">Physiotherapist</SelectItem>
                    <SelectItem value="rad">Radiographer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Shift Date, Start Time, End Time */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                    Date
                  </Label>
                  <Input
                    type="date"
                    defaultValue="2026-02-17"
                    className="h-9 text-[13px] rounded-lg bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-medium text-foreground">
                    Start
                  </Label>
                  <Input
                    type="time"
                    defaultValue="08:00"
                    className="h-9 text-[13px] rounded-lg bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-medium text-foreground">
                    End
                  </Label>
                  <Input
                    type="time"
                    defaultValue="20:00"
                    className="h-9 text-[13px] rounded-lg bg-background"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/50" />

              {/* ── Section: Requirements ── */}
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] mb-3">
                  Requirements
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  Location
                </Label>
                <Input
                  placeholder="e.g., Ward A3, Royal London Hospital"
                  className="h-9 text-[13px] rounded-lg bg-background"
                />
              </div>

              {/* Qualifications Required */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-muted-foreground" />
                  Qualifications Required
                </Label>
                <Input
                  placeholder="e.g., NMC Registration, IV Therapy"
                  className="h-9 text-[13px] rounded-lg bg-background"
                />
              </div>

              {/* Pay Rate */}
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-foreground flex items-center gap-1.5">
                  <PoundSterling className="w-3.5 h-3.5 text-muted-foreground" />
                  Pay Rate (/hour)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground font-medium">
                    £
                  </span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="h-9 text-[13px] rounded-lg bg-background pl-7"
                  />
                </div>
              </div>

              {/* Match Button */}
              <Button
                disabled
                className="w-full h-10 mt-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg text-[13px] shadow-sm shadow-blue-500/20 transition-all duration-200 cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Match Staff with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ═══ Right Column: AI Matching Results ═══ */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "360ms" }}>
          {isMatching ? (
            /* ── Loading State ── */
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                {/* Animated Loader */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Loader2 className="w-9 h-9 text-white animate-spin" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border border-border/50">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">
                  AI Matching in Progress
                </h3>
                <p className="text-[12px] text-muted-foreground mt-2 max-w-[280px] leading-relaxed">
                  Analysing availability, qualifications, compliance status, and
                  performance history to find the best matches...
                </p>
                {/* Animated dots / progress */}
                <div className="flex items-center gap-1.5 mt-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </CardContent>
          ) : showMatching ? (
            /* ── Results State ── */
            <>
              <CardHeader className="pb-0 px-6 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-[15px] font-semibold text-foreground">
                        AI Matching Results
                      </CardTitle>
                      <CardDescription className="text-[12px] text-muted-foreground mt-0.5">
                        Ranked by compatibility score
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-medium px-2.5 py-0.5 border border-emerald-200/60 dark:border-emerald-800/40 h-6"
                  >
                    {candidates.length} Found
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-4">
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {candidates.map((candidate, i) => (
                    <CandidateCard
                      key={i}
                      candidate={candidate}
                      index={i}
                      onAssign={handleAssign}
                      onView={handleView}
                    />
                  ))}
                </div>
              </CardContent>
            </>
          ) : (
            /* ── Empty State ── */
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                {/* Decorative icon */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center border border-border/40">
                    <Search className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-border/50">
                    <Sparkles className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">
                  Ready to Match
                </h3>
                <p className="text-[13px] text-muted-foreground mt-2 max-w-[300px] leading-relaxed">
                  Complete the shift request form and click{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    &quot;Match Staff with AI&quot;
                  </span>{" "}
                  to discover the best candidates
                </p>
                {/* Visual hint steps */}
                <div className="flex items-center gap-4 mt-8">
                  {[
                    { icon: BriefcaseMedical, label: "Set role" },
                    { icon: CalendarDays, label: "Pick date" },
                    { icon: Sparkles, label: "AI match" },
                  ].map((step, i) => (
                    <React.Fragment key={step.label}>
                      {i > 0 && (
                        <div className="w-6 h-px bg-border/60" />
                      )}
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-9 h-9 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {step.label}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
