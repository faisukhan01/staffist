"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Clock,
  Shield,
  DollarSign,
  UserPlus,
  Download,
  Calendar,
  BarChart3,
  Activity,
  Users,
  Target,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

/* ── Types ── */
interface KpiMetric {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  sub: string;
  color: string;
  iconBg: string;
}

/* ── Data ── */
const kpis: KpiMetric[] = [
  {
    title: "Total Revenue",
    value: "£2.4M",
    change: "+18.2%",
    changeType: "positive",
    icon: DollarSign,
    sub: "Monthly recurring revenue",
    color: "text-emerald-600",
    iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    title: "Active Placements",
    value: "1,847",
    change: "+12.4%",
    changeType: "positive",
    icon: Users,
    sub: "Currently active staff",
    color: "text-blue-600",
    iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    title: "Fill Rate",
    value: "94.7%",
    change: "+2.1%",
    changeType: "positive",
    icon: Target,
    sub: "Shifts successfully filled",
    color: "text-violet-600",
    iconBg: "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
  },
  {
    title: "Avg. Time to Fill",
    value: "3.2h",
    change: "-24.5%",
    changeType: "positive",
    icon: Clock,
    sub: "Average placement time",
    color: "text-amber-600",
    iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    changeType: "positive",
    icon: Star,
    sub: "Average client rating",
    color: "text-rose-600",
    iconBg: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
  },
  {
    title: "Compliance Rate",
    value: "99.1%",
    change: "+0.4%",
    changeType: "positive",
    icon: Shield,
    sub: "Staff compliance status",
    color: "text-teal-600",
    iconBg: "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
  },
];

const availabilityData = [
  { day: "Mon", available: 92, demand: 78 },
  { day: "Tue", available: 88, demand: 82 },
  { day: "Wed", available: 85, demand: 90 },
  { day: "Thu", available: 90, demand: 75 },
  { day: "Fri", available: 87, demand: 85 },
  { day: "Sat", available: 65, demand: 55 },
  { day: "Sun", available: 58, demand: 40 },
];

const weeklyTrends = [
  { week: "Wk 1", placements: 280, revenue: 420 },
  { week: "Wk 2", placements: 295, revenue: 443 },
  { week: "Wk 3", placements: 260, revenue: 390 },
  { week: "Wk 4", placements: 310, revenue: 465 },
  { week: "Wk 5", placements: 325, revenue: 488 },
];

const topRoles = [
  { role: "Registered Nurse", count: 340, pct: 100 },
  { role: "Healthcare Assistant", count: 280, pct: 82 },
  { role: "Physiotherapist", count: 180, pct: 53 },
  { role: "Radiographer", count: 120, pct: 35 },
  { role: "Occupational Therapist", count: 95, pct: 28 },
];

const costData = [
  { label: "Hourly Rate", agency: 120, platform: 80 },
  { label: "Placement Fee", agency: 180, platform: 100 },
  { label: "Admin Costs", agency: 60, platform: 30 },
  { label: "Total Cost", agency: 360, platform: 210 },
];

const departmentPerformance = [
  { dept: "Emergency", fillRate: 96, target: 95, status: "above" },
  { dept: "Surgery", fillRate: 98, target: 95, status: "above" },
  { dept: "Pediatrics", fillRate: 97, target: 95, status: "above" },
  { dept: "Maternity", fillRate: 95, target: 95, status: "meet" },
  { dept: "ICU", fillRate: 94, target: 95, status: "below" },
  { dept: "Cardiology", fillRate: 92, target: 95, status: "below" },
];

const regionalData = [
  { region: "London", placements: 485, revenue: "£728K", growth: "+14.2%" },
  { region: "Manchester", placements: 342, revenue: "£513K", growth: "+18.7%" },
  { region: "Birmingham", placements: 298, revenue: "£447K", growth: "+9.3%" },
  { region: "Leeds", placements: 267, revenue: "£401K", growth: "+22.1%" },
  { region: "Liverpool", placements: 234, revenue: "£351K", growth: "+11.8%" },
];

const heatmap = {
  departments: ["Emergency", "ICU", "Surgery", "Cardiology", "Pediatrics", "Maternity"],
  shifts: ["Morning", "Afternoon", "Night"],
  data: [
    [95, 92, 88, 85, 90, 94],
    [88, 85, 92, 82, 87, 91],
    [78, 75, 82, 70, 80, 85],
  ],
};

/* ── Helpers ── */
function heatCell(v: number) {
  if (v >= 90) return "bg-emerald-500 text-white";
  if (v >= 80) return "bg-emerald-400 text-white";
  if (v >= 70) return "bg-amber-400 text-white";
  return "bg-red-400 text-white";
}

function deptStatus(s: string) {
  if (s === "above") return "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400";
  if (s === "meet")  return "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400";
  return "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400";
}

/* ── Custom Recharts Tooltip ── */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/60 bg-popover text-popover-foreground shadow-lg px-3 py-2.5 text-xs">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold tabular-nums">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */

export function AdminAnalyticsPage() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("30days");

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Fetching latest analytics data...",
    });
    
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: "Analytics dashboard updated with latest metrics.",
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Analytics",
      description: "Generating comprehensive analytics report...",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Analytics report has been downloaded successfully.",
      });
    }, 2000);
  };

  const handleDateRangeChange = () => {
    toast({
      title: "Date Range Updated",
      description: "Analytics data filtered for the selected time period.",
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <BarChart3 className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Analytics</h1>
            <p className="text-[12px] text-muted-foreground">Real-time workforce performance metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDateRangeChange}
            className="h-9 px-3 text-xs gap-1.5 border-border/60"
          >
            <Calendar className="w-3.5 h-3.5" />
            Last 30 Days
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="h-9 px-3 text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={handleExport}
            className="h-9 px-3 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = kpi.changeType === "positive";
          return (
            <Card
              key={kpi.title}
              className="border border-border/50 card-stat bg-card card-hover-group rounded-xl animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.iconBg} transition-transform duration-300 card-hover-group-icon`}>
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-[22px] font-bold text-foreground tracking-tight leading-none tabular-nums mb-1">
                  {kpi.value}
                </p>
                <p className="text-[11px] font-semibold text-foreground mb-0.5">{kpi.title}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{kpi.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Row 1: Availability + Weekly Trend ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Staff Availability vs Demand */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "360ms" }}>
          <CardHeader className="pb-0 px-5 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Activity className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <CardTitle className="text-[13px] font-semibold">Staff Availability vs Demand</CardTitle>
                  <CardDescription className="text-[11px] mt-0.5">Weekly staffing levels</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4 pt-3">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={availabilityData} barGap={4} barCategoryGap="28%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.5 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="available" name="Available" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="demand" name="Demand" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Placement Trend */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "420ms" }}>
          <CardHeader className="pb-0 px-5 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <TrendingUp className="w-4 h-4" strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="text-[13px] font-semibold">Weekly Placement Trend</CardTitle>
                <CardDescription className="text-[11px] mt-0.5">Placements & revenue (£K) over 5 weeks</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4 pt-3">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyTrends}>
                <defs>
                  <linearGradient id="gradPlacements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area type="monotone" dataKey="placements" name="Placements" stroke="#2563eb" strokeWidth={2} fill="url(#gradPlacements)" dot={{ fill: "#2563eb", r: 3 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue (£K)" stroke="#10b981" strokeWidth={2} fill="url(#gradRevenue)" dot={{ fill: "#10b981", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 2: Top Roles + Department Performance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top Roles */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "480ms" }}>
          <CardHeader className="pb-3 px-5 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                <Users className="w-4 h-4" strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="text-[13px] font-semibold">Top Roles by Placement</CardTitle>
                <CardDescription className="text-[11px] mt-0.5">Most in-demand positions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {topRoles.map((item, i) => {
              const colors = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"];
              return (
                <div key={item.role} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        style={{ background: colors[i] }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[12px] font-medium text-foreground">{item.role}</span>
                    </div>
                    <span className="text-[12px] font-bold text-foreground tabular-nums">{item.count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, background: colors[i] }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "540ms" }}>
          <CardHeader className="pb-3 px-5 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                <Target className="w-4 h-4" strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="text-[13px] font-semibold">Department Fill Rate</CardTitle>
                <CardDescription className="text-[11px] mt-0.5">vs 95% target benchmark</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2">
            {departmentPerformance.map((dept) => (
              <div key={dept.dept} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <span className="text-[12px] font-medium text-foreground w-28 flex-shrink-0">{dept.dept}</span>
                <div className="flex-1 mx-4 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${dept.status === "above" ? "bg-emerald-500" : dept.status === "meet" ? "bg-blue-500" : "bg-amber-500"}`}
                    style={{ width: `${dept.fillRate}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[12px] font-bold tabular-nums text-foreground">{dept.fillRate}%</span>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] font-medium px-1.5 py-0 h-4 border ${deptStatus(dept.status)}`}
                  >
                    {dept.status === "above" ? "Above" : dept.status === "meet" ? "On Target" : "Below"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Row 3: Cost Comparison + Heatmap ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Cost Comparison */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <CardHeader className="pb-0 px-5 pt-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                <DollarSign className="w-4 h-4" strokeWidth={1.8} />
              </div>
              <div>
                <CardTitle className="text-[13px] font-semibold">Cost Comparison</CardTitle>
                <CardDescription className="text-[11px] mt-0.5">Staffist Platform vs Traditional Agency (£)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-4 pt-3">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={costData} barGap={4} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={28} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.5 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="agency" name="Traditional Agency" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.8} />
                <Bar dataKey="platform" name="Staffist Platform" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Shift Fulfillment Matrix */}
        <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "660ms" }}>
          <CardHeader className="pb-3 px-5 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                  <BarChart3 className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <CardTitle className="text-[13px] font-semibold">Shift Fulfillment Matrix</CardTitle>
                  <CardDescription className="text-[11px] mt-0.5">Fill rate % by department &amp; shift</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />90%+</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />70–89%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />&lt;70%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr>
                    <th className="text-left text-muted-foreground font-medium pb-2 pr-3 w-24">Shift</th>
                    {heatmap.departments.map((d) => (
                      <th key={d} className="text-center text-muted-foreground font-medium pb-2 px-1">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="space-y-1">
                  {heatmap.shifts.map((shift, rowIdx) => (
                    <tr key={shift}>
                      <td className="text-muted-foreground font-medium pr-3 py-1 whitespace-nowrap">{shift}</td>
                      {heatmap.data[rowIdx].map((val, colIdx) => (
                        <td key={colIdx} className="px-1 py-1 text-center">
                          <span className={`inline-flex items-center justify-center w-full rounded-md py-1.5 font-semibold tabular-nums ${heatCell(val)}`}>
                            {val}%
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/40">
              <div className="text-center">
                <p className="text-[18px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">87.2%</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Avg Fill Rate</p>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-foreground">Surgery</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Top Department</p>
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-amber-600 dark:text-amber-400">Night</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Needs Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Row 4: Regional Performance ── */}
      <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "720ms" }}>
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <Activity className="w-4 h-4" strokeWidth={1.8} />
            </div>
            <div>
              <CardTitle className="text-[13px] font-semibold">Regional Performance</CardTitle>
              <CardDescription className="text-[11px] mt-0.5">Placements and revenue by region</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] pb-2 pr-6">Region</th>
                  <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] pb-2 pr-6">Placements</th>
                  <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] pb-2 pr-6">Revenue</th>
                  <th className="text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.06em] pb-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((row, i) => (
                  <tr key={row.region} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 pr-6 font-medium text-foreground">{row.region}</td>
                    <td className="py-2.5 pr-6 text-right tabular-nums text-foreground font-semibold">{row.placements.toLocaleString()}</td>
                    <td className="py-2.5 pr-6 text-right tabular-nums text-foreground">{row.revenue}</td>
                    <td className="py-2.5 text-right">
                      <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <ArrowUpRight className="w-3 h-3" />
                        {row.growth.replace("+", "")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
