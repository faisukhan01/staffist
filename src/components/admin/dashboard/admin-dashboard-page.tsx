"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Users, ClipboardCheck, AlertTriangle, CalendarCheck,
  TrendingUp, ArrowRight, Clock, Shield, CheckCircle2, XCircle,
  Brain, Activity, Sparkles, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { ApproveShiftDialog, DeclineShiftDialog } from "@/components/admin/dialogs/admin-dialogs";

/* ── Animated Counter ── */
function useAnimatedCounter(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

/* ── Data ── */
const stats = [
  { label: "Available Staff", value: 247, change: "+12 this week", trend: "up" as const, icon: Users, color: "blue" },
  { label: "Pending Shifts", value: 18, change: "3 urgent", trend: "neutral" as const, icon: CalendarCheck, color: "amber" },
  { label: "Compliance Alerts", value: 3, change: "expiring soon", trend: "neutral" as const, icon: AlertTriangle, color: "red" },
  { label: "Filled This Week", value: 142, change: "75% fill rate", trend: "up" as const, icon: ClipboardCheck, color: "emerald" },
];

const colorMap: Record<string, { icon: string; trend: string }> = {
  blue: { icon: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400", trend: "text-emerald-600" },
  amber: { icon: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400", trend: "text-amber-600" },
  red: { icon: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400", trend: "text-red-600" },
  emerald: { icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400", trend: "text-emerald-600" },
};

const recentActivity = [
  { name: "Dr. Sarah Mitchell", role: "Consultant", dept: "Cardiology", status: "Active", time: "09:15" },
  { name: "James Anderson", role: "Nurse", dept: "Emergency", status: "Scheduled", time: "08:42" },
  { name: "Emma Thompson", role: "Radiographer", dept: "Radiology", status: "Pending", time: "16:30" },
  { name: "Dr. Michael Chen", role: "Anesthetist", dept: "Surgery", status: "Active", time: "14:20" },
  { name: "Lisa Williams", role: "Physiotherapist", dept: "Rehabilitation", status: "Scheduled", time: "11:05" },
];

const chartData = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 78 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 65 },
  { day: "Sun", value: 58 },
];

const pendingApprovals = [
  { title: "Night Shift — Emergency Department", requestedBy: "Dr. Roberts", detail: "2 nurses needed", time: "10 min ago" },
  { title: "Weekend Cover — Intensive Care", requestedBy: "Nurse Manager", detail: "1 specialist needed", time: "25 min ago" },
  { title: "OT Cover — Rehabilitation Ward", requestedBy: "Ward Lead", detail: "1 OT needed", time: "1 hour ago" },
];

const expiryAlerts = [
  { name: "Dr. Sarah Mitchell", detail: "DBS Check expires in 14 days", urgency: "warning" },
  { name: "James Anderson", detail: "CPR Training expires in 21 days", urgency: "warning" },
  { name: "Emma Thompson", detail: "Professional Registration renewal in 28 days", urgency: "safe" },
];

/* ── Status Badge ── */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
    Scheduled: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/40",
    Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40",
  };
  const dotConfig: Record<string, string> = {
    Active: "bg-emerald-500",
    Scheduled: "bg-blue-500",
    Pending: "bg-amber-500",
  };
  return (
    <Badge variant="secondary" className={`${config[status] || "bg-muted text-muted-foreground"} text-[11px] font-medium px-2 py-0.5 h-5 border`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${dotConfig[status] || "bg-muted-foreground"}`} />
      {status}
    </Badge>
  );
}

/* ── Stat Card ── */
function StatCard({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const animatedValue = useAnimatedCounter(stat.value);
  const Icon = stat.icon;
  const colors = colorMap[stat.color];
  return (
    <Card className="border border-border/50 card-stat bg-card card-hover-group rounded-xl animate-fade-in-up relative overflow-hidden" style={{ animationDelay: `${index * 60}ms` }}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">{stat.label}</p>
            <p className="text-[30px] font-bold text-foreground tracking-tight leading-none tabular-nums">{animatedValue.toLocaleString()}</p>
            <div className="flex items-center gap-1.5">
              {stat.trend === "up" && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />}
              <span className={`text-[11px] font-medium ${stat.trend === "up" ? colors.trend : "text-muted-foreground"}`}>{stat.change}</span>
            </div>
          </div>
          <div className={`p-2.5 rounded-xl ${colors.icon} transition-transform duration-300 card-hover-group-icon`}>
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>
        </div>
      </CardContent>
      <div className="card-sweep-line card-sweep-line-blue" />
    </Card>
  );
}

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 dark:bg-slate-700 px-3 py-2 rounded-lg shadow-lg border border-slate-700/50">
        <p className="text-[11px] text-slate-300 font-medium">{label}</p>
        <p className="text-[13px] text-white font-bold tabular-nums">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

/* ── Main Dashboard ── */
export function AdminDashboardPage() {
  const { toast } = useToast();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState<typeof pendingApprovals[0] | null>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");

  const handleApprove = useCallback((shift: typeof pendingApprovals[0]) => {
    setSelectedShift(shift);
    setShowApproveDialog(true);
  }, []);

  const handleReject = useCallback((shift: typeof pendingApprovals[0]) => {
    setSelectedShift(shift);
    setShowDeclineDialog(true);
  }, []);

  const handleTimeRangeChange = (range: "week" | "month") => {
    setTimeRange(range);
    toast({
      title: `Viewing ${range === "week" ? "This Week" : "This Month"}`,
      description: `Dashboard data updated to show ${range === "week" ? "weekly" : "monthly"} metrics.`,
    });
  };

  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-in-up">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your workforce today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleTimeRangeChange("week")}
            className={`text-[12px] h-8 rounded-lg ${
              timeRange === "week" 
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white shadow-sm shadow-blue-500/20" 
                : "border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            This Week
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleTimeRangeChange("month")}
            className={`text-[12px] h-8 rounded-lg ${
              timeRange === "month" 
                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white shadow-sm shadow-blue-500/20" 
                : "border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>

      {/* Main Grid — SWAPPED: Recent Activity first, then Shift Fulfillment chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Activity — NOW IN THE LEFT (2-col) */}
        <Card className="xl:col-span-2 border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-0 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[15px] font-semibold">Recent Activity</CardTitle>
                <CardDescription className="text-[12px] mt-0.5">Latest staff updates and status changes</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[12px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 h-7">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-5 pt-3">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] pb-2.5 pr-4">Name</th>
                    <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] pb-2.5 pr-4 hidden sm:table-cell">Role</th>
                    <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] pb-2.5 pr-4 hidden md:table-cell">Department</th>
                    <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] pb-2.5 pr-4">Status</th>
                    <th className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] pb-2.5 hidden sm:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((item, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer group">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 text-[9px] font-bold">
                              {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[13px] font-medium text-foreground group-hover:text-blue-600 transition-colors">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[12px] text-muted-foreground hidden sm:table-cell">{item.role}</td>
                      <td className="py-3 pr-4 text-[12px] text-muted-foreground hidden md:table-cell">{item.dept}</td>
                      <td className="py-3 pr-4"><StatusBadge status={item.status} /></td>
                      <td className="py-3 text-[11px] text-muted-foreground hidden sm:table-cell">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "350ms" }}>
          <CardHeader className="pb-0 px-6 pt-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[15px] font-semibold">Pending Approvals</CardTitle>
              <Badge variant="secondary" className="text-[10px] font-medium bg-amber-50 text-amber-700 border-amber-200/60 h-5">{pendingApprovals.length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-5 pt-3">
            <div className="space-y-2.5">
              {pendingApprovals.map((item, i) => (
                <div key={i} className="card-hover-group relative p-3 rounded-lg border border-border/40 hover:border-border/80 hover:bg-muted/20 transition-colors duration-200 overflow-hidden">
                  <p className="text-[13px] font-medium text-foreground leading-snug">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{item.requestedBy} · {item.detail}</p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <Button size="sm" onClick={() => handleApprove(item)}
                      className="h-7 text-[11px] bg-blue-600 hover:bg-blue-700 text-white px-3 font-medium rounded-lg shadow-sm shadow-blue-500/15">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(item)}
                      className="h-7 text-[11px] text-muted-foreground px-3 rounded-lg border-border/50 hover:text-foreground">
                      Decline
                    </Button>
                  </div>
                  <div className="card-sweep-line card-sweep-line-blue" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row — Shift Fulfillment Chart (now with Recharts) + AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Shift Fulfillment Chart with Recharts */}
        <Card className="xl:col-span-2 border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="pb-0 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[15px] font-semibold">Shift Fulfillment</CardTitle>
                <CardDescription className="text-[12px] mt-0.5">Weekly efficiency rate</CardDescription>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full">
                <ArrowUpRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">+18%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-4">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} dy={8} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="url(#strokeGradient)" strokeWidth={2.5} fill="url(#fillGradient)" dot={{ r: 4, fill: "#2563eb", stroke: "#fff", strokeWidth: 2, fillOpacity: 1 }} activeDot={{ r: 5, fill: "#2563eb", stroke: "#fff", strokeWidth: 2, fillOpacity: 1 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border border-blue-200/40 dark:border-blue-800/30 card-elevated rounded-xl bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-blue-950/10 overflow-hidden relative animate-fade-in-up" style={{ animationDelay: "450ms" }}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full pointer-events-none" />
          <CardContent className="p-6 relative">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[14px] font-semibold text-foreground">AI Insights</span>
            </div>
            <div className="space-y-3">
              <div className="card-hover-group relative p-3 rounded-lg bg-white/80 dark:bg-slate-800/50 border border-blue-100/50 dark:border-blue-900/20 hover:shadow-sm transition-shadow overflow-hidden">
                <p className="text-[12px] font-medium text-foreground mb-1">Staffing Optimization</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  ICU staffing should increase by 2 nurses during night shifts for optimal coverage.
                </p>
                <div className="card-sweep-line card-sweep-line-blue" />
              </div>
              <div className="card-hover-group relative p-3 rounded-lg bg-white/80 dark:bg-slate-800/50 border border-blue-100/50 dark:border-blue-900/20 hover:shadow-sm transition-shadow overflow-hidden">
                <p className="text-[12px] font-medium text-foreground mb-1">Cost Efficiency</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Platform usage reduced agency costs by 32% this quarter. Expand to more departments.
                </p>
                <div className="card-sweep-line card-sweep-line-blue" />
              </div>
              <div className="card-hover-group relative p-3 rounded-lg bg-white/80 dark:bg-slate-800/50 border border-emerald-100/50 dark:border-emerald-900/20 hover:shadow-sm transition-shadow overflow-hidden">
                <p className="text-[12px] font-medium text-foreground mb-1.5">Compliance Score</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full progress-animated" style={{ width: "93%" }} />
                  </div>
                  <span className="text-[13px] font-bold text-emerald-600 tabular-nums">93%</span>
                </div>
                <div className="card-sweep-line card-sweep-line-emerald" />
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full text-[12px] h-8 border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg font-medium">
              View Full Report <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Third Row — Improved Compliance Overview & Expiry Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Compliance Overview — Professional SaaS look */}
        <Card className="xl:col-span-2 border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <CardHeader className="pb-0 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200/40 dark:border-blue-800/30">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold">Compliance Overview</CardTitle>
                  <CardDescription className="text-[12px] mt-0.5">Document verification status across all staff</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px] font-medium bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 h-6 px-2.5">
                <CheckCircle2 className="w-3 h-3 mr-1" />93% Overall
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "DBS Checks", value: 94, total: 247, color: "bg-blue-500", desc: "233 verified, 14 pending" },
                { label: "Professional Registration", value: 98, total: 247, color: "bg-emerald-500", desc: "242 active, 5 expiring" },
                { label: "Mandatory Training", value: 87, total: 247, color: "bg-amber-500", desc: "215 complete, 32 in progress" },
                { label: "Immunization Records", value: 91, total: 247, color: "bg-violet-500", desc: "225 current, 22 expiring" },
              ].map((item, i) => (
                <div key={item.label} className="card-hover-group relative p-4 rounded-xl border border-border/40 hover:border-border/70 hover:shadow-sm transition-colors duration-200 bg-gradient-to-br from-white/80 to-white dark:from-slate-800/40 to-slate-800/20 overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${item.color} shadow-sm`} />
                      <span className="text-[13px] font-medium text-foreground">{item.label}</span>
                    </div>
                    <span className="text-[15px] font-bold text-foreground tabular-nums">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted/60 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} progress-animated`} style={{ width: `${item.value}%`, animationDelay: `${i * 150}ms` }} />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">{item.desc}</p>
                  <div className="card-sweep-line card-sweep-line-blue" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiry Alerts — Professional SaaS look */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "550ms" }}>
          <CardHeader className="pb-0 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200/40 dark:border-amber-800/30">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-[15px] font-semibold">Expiry Alerts</CardTitle>
                  <CardDescription className="text-[12px] mt-0.5">Documents requiring renewal</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px] font-medium bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 h-6 px-2.5">
                3 alerts
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-5 pt-3">
            <div className="space-y-2.5">
              {expiryAlerts.map((item, i) => (
                <div key={i} className={`card-hover-group relative flex items-start gap-3.5 p-3.5 rounded-xl border border-border/30 hover:border-border/60 hover:shadow-sm transition-colors duration-200 bg-gradient-to-br from-white/60 to-white dark:from-slate-800/30 to-slate-800/20 overflow-hidden`}>
                  <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${
                    item.urgency === "warning"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30"
                      : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30"
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${item.urgency === "safe" ? "hidden" : ""}`} />
                    <CheckCircle2 className={`w-4 h-4 ${item.urgency !== "safe" ? "hidden" : ""}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground leading-snug">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.detail}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Action required
                    </p>
                  </div>
                  <div className={`card-sweep-line ${item.urgency === "warning" ? "card-sweep-line-amber" : "card-sweep-line-emerald"}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialogs */}
      {selectedShift && (
        <>
          <ApproveShiftDialog
            open={showApproveDialog}
            onClose={() => {
              setShowApproveDialog(false);
              setSelectedShift(null);
            }}
            shiftTitle={selectedShift.title}
            requestedBy={selectedShift.requestedBy}
            detail={selectedShift.detail}
          />
          <DeclineShiftDialog
            open={showDeclineDialog}
            onClose={() => {
              setShowDeclineDialog(false);
              setSelectedShift(null);
            }}
            shiftTitle={selectedShift.title}
          />
        </>
      )}
    </div>
  );
}
