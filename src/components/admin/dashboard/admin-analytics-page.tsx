"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
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
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const overviewStats = [
  {
    title: "Total Shifts Filled",
    value: "1,247",
    change: "+12%",
    changeLabel: "vs last week",
    trend: "up" as const,
    icon: Calendar,
  },
  {
    title: "Avg Time to Fill",
    value: "4.2h",
    change: "-18%",
    changeLabel: "vs last week",
    trend: "down" as const,
    icon: Clock,
  },
  {
    title: "Compliance Rate",
    value: "98.7%",
    change: "+0.3%",
    changeLabel: "vs last week",
    trend: "up" as const,
    icon: Shield,
  },
  {
    title: "Cost Savings",
    value: "32%",
    change: "",
    changeLabel: "vs traditional",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "New Staff Onboarded",
    value: "89",
    change: "+24%",
    changeLabel: "vs last week",
    trend: "up" as const,
    icon: UserPlus,
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

const topRoles = [
  { role: "Registered Nurse", count: 340 },
  { role: "Healthcare Assistant", count: 280 },
  { role: "Physiotherapist", count: 180 },
  { role: "Radiographer", count: 120 },
  { role: "Occupational Therapist", count: 95 },
];

const performanceMetrics = [
  { label: "Retention Rate", value: "94.2%", icon: Users },
  { label: "Performance", value: "4.8/5", icon: Star },
  { label: "Repeat Placement", value: "73%", icon: Target },
  { label: "NPS", value: "8.3", icon: Flame },
];

const retentionData = [
  { month: "Jan", value: 92 },
  { month: "Feb", value: 93.5 },
  { month: "Mar", value: 91 },
  { month: "Apr", value: 94 },
  { month: "May", value: 93.8 },
  { month: "Jun", value: 94.2 },
];

const forecastData = [
  { week: "Week 1", value: 280 },
  { week: "Week 2", value: 295 },
  { week: "Week 3", value: 260 },
  { week: "Week 4", value: 300 },
];

const costComparison = [
  { label: "Traditional Agency", values: [120, 180, 60, 360], color: "from-red-400 to-red-300", hoverColor: "hover:from-red-500 hover:to-red-400" },
  { label: "Staffist Platform", values: [80, 100, 30, 210], color: "from-blue-600 to-blue-400", hoverColor: "hover:from-blue-700 hover:to-blue-500" },
];

const costLabels = ["Hourly Rate", "Placement Fee", "Admin Costs", "Total Cost"];

const heatmapData = {
  departments: ["Emergency", "Cardiology", "ICU", "Surgery", "Pediatrics"],
  shifts: ["Morning", "Afternoon", "Night"],
  data: [
    [92, 88, 75, 85, 90],
    [78, 82, 70, 80, 85],
    [65, 72, 60, 68, 75],
  ],
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function getHeatColor(v: number) {
  if (v >= 85) return "bg-emerald-500 text-white";
  if (v >= 70) return "bg-amber-400 text-white";
  return "bg-red-400 text-white";
}

/* ═══════════════════════════════════════════════════════════════
   REUSABLE CHART BAR WITH TOOLTIP
   ═══════════════════════════════════════════════════════════════ */

interface ChartBarWithTooltipProps {
  /** Height as percentage string, e.g. "80%" */
  height: string;
  /** Display value shown in tooltip, e.g. "92" */
  value: string;
  /** Tooltip label, e.g. "Available" */
  label: string;
  /** Gradient classes for the bar fill, e.g. "from-blue-600 to-blue-400" */
  gradient: string;
  /** Additional hover gradient classes */
  hoverGradient?: string;
  /** Additional className for the bar element */
  className?: string;
  /** Animation delay index for staggered entry (multiplied by 60ms internally) */
  delayIndex?: number;
}

function ChartBarWithTooltip({
  height,
  value,
  label,
  gradient,
  hoverGradient = "",
  className = "",
  delayIndex = 0,
}: ChartBarWithTooltipProps) {
  return (
    <div
      className={`chart-bar-container flex-1 ${className}`}
      style={{ height }}
    >
      {/* Tooltip */}
      <div className="chart-tooltip">
        <div className="flex flex-col items-center px-2.5 py-1.5 rounded-lg bg-popover text-popover-foreground shadow-lg border border-border/60 text-[11px]">
          <span className="font-bold text-foreground tabular-nums">{value}</span>
          <span className="text-muted-foreground">{label}</span>
        </div>
      </div>
      {/* Bar */}
      <div
        className={`w-full h-full rounded-t-md bg-gradient-to-t ${gradient} ${hoverGradient} transition-all duration-300 cursor-pointer hover:brightness-110`}
        style={{
          animationDelay: `${delayIndex * 60}ms`,
          minHeight: "4px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function AdminAnalyticsPage() {
  const maxAvailable = Math.max(...availabilityData.map((d) => d.available));
  const maxTopRole = Math.max(...topRoles.map((r) => r.count));
  const maxCost = 360;
  const maxRetention = Math.max(...retentionData.map((d) => d.value));
  const minRetention = Math.min(...retentionData.map((d) => d.value));
  const retentionRange = maxRetention - minRetention || 1;
  const maxForecast = Math.max(...forecastData.map((d) => d.value));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* ──── Page Header ──── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up"
        style={{ animationDelay: "0ms" }}
      >
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1.5">
            Workforce insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[13px] gap-1.5 border-border/60 bg-card hover:bg-muted/50"
          >
            <Calendar className="w-3.5 h-3.5" />
            This Week
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
          <Button
            size="sm"
            className="h-8 text-[13px] gap-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* ──── Overview Stats ──── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {overviewStats.map((stat, idx) => {
          const Icon = stat.icon;
          const isTimeToFill = stat.title === "Avg Time to Fill";
          const isPositiveTrend = stat.trend === "up";
          const showPositiveColor = isTimeToFill
            ? !isPositiveTrend
            : isPositiveTrend;

          return (
            <Card
              key={stat.title}
              className="border border-border/50 card-stat rounded-xl bg-card animate-fade-in-up"
              style={{ animationDelay: `${80 + idx * 60}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-600/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  {stat.change && (
                    <Badge
                      variant="secondary"
                      className={`h-5 px-1.5 text-[11px] font-semibold gap-0.5 border ${
                        showPositiveColor
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                          : "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40"
                      }`}
                    >
                      {showPositiveColor ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className="text-[24px] font-bold text-foreground leading-none mb-1 tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[12px] text-muted-foreground font-medium">
                  {stat.title}
                </p>
                {!stat.change && (
                  <p className="text-[11px] text-muted-foreground/70 mt-1">
                    {stat.changeLabel}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ──── Charts Row 1 ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Availability vs Demand */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "380ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Staff Availability vs Demand
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Weekly staffing levels overview
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <Activity className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400" />
                <span className="text-[12px] text-muted-foreground">
                  Available Staff
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-200/80" />
                <span className="text-[12px] text-muted-foreground">
                  Demand
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-end gap-2.5 h-52">
              {availabilityData.map((item, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="flex items-end gap-1 w-full h-40">
                    <ChartBarWithTooltip
                      height={`${(item.available / maxAvailable) * 100}%`}
                      value={String(item.available)}
                      label="Available"
                      gradient="from-blue-600 to-blue-400"
                      hoverGradient="hover:from-blue-700 hover:to-blue-500"
                      delayIndex={i}
                    />
                    <ChartBarWithTooltip
                      height={`${(item.demand / maxAvailable) * 100}%`}
                      value={String(item.demand)}
                      label="Demand"
                      gradient="from-blue-200 to-blue-100 dark:from-blue-900/60 dark:to-blue-800/40"
                      hoverGradient="hover:from-blue-300 hover:to-blue-200 dark:hover:from-blue-800/70 dark:hover:to-blue-700/50"
                      delayIndex={i}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Frequently Filled Roles */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "440ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Most Frequently Filled Roles
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Top roles by placement volume
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-5">
              {topRoles.map((item, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-foreground">
                      {item.role}
                    </span>
                    <span className="text-[13px] font-semibold text-foreground tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 progress-animated"
                      style={{
                        width: `${(item.count / maxTopRole) * 100}%`,
                        animationDelay: `${500 + i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ──── Charts Row 2 ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Comparison */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Cost Comparison
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Platform vs Traditional Agency
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-5 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-red-400 to-red-300" />
                <span className="text-[12px] text-muted-foreground">
                  Traditional Agency
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400" />
                <span className="text-[12px] text-muted-foreground">
                  Staffist Platform
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-end gap-3 h-48">
              {costLabels.map((label, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1 w-full h-36">
                    {costComparison.map((comp, ci) => (
                      <ChartBarWithTooltip
                        key={comp.label}
                        height={`${(comp.values[i] / maxCost) * 100}%`}
                        value={`\u00A3${comp.values[i]}`}
                        label={comp.label}
                        gradient={comp.color}
                        hoverGradient={comp.hoverColor}
                        delayIndex={i * 2 + ci}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium text-center leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Retention & Performance */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "560ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Staff Retention &amp; Performance
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Key quality metrics overview
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {performanceMetrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border/40 bg-gradient-to-br from-muted/40 to-muted/20 p-3.5 text-center transition-all duration-200 hover:border-blue-200/60 hover:shadow-sm"
                  >
                    <Icon className="w-4 h-4 mx-auto text-[#2563EB] mb-2" />
                    <p className="text-[18px] font-bold text-foreground leading-none tabular-nums">
                      {metric.value}
                    </p>
                    <p className="text-[11px] text-muted-foreground font-medium mt-1.5">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Retention Trend */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Retention Trend (6 months)
              </p>
              <div className="flex items-end gap-2 h-28">
                {retentionData.map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1.5"
                  >
                    <ChartBarWithTooltip
                      height={`${((item.value - minRetention + 1) / (retentionRange + 2)) * 100}%`}
                      value={`${item.value}%`}
                      label={item.month}
                      gradient="from-emerald-500 to-emerald-400"
                      hoverGradient="hover:from-emerald-600 hover:to-emerald-500"
                      delayIndex={i}
                    />
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ──── Charts Row 3 ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staffing Forecast */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "620ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Staffing Forecast
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Projected shifts for the next 4 weeks
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-end gap-4 h-48">
              {forecastData.map((item, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <ChartBarWithTooltip
                    height={`${(item.value / maxForecast) * 100}%`}
                    value={String(item.value)}
                    label={item.week}
                    gradient="from-blue-600 to-blue-400"
                    hoverGradient="hover:from-blue-700 hover:to-blue-500"
                    delayIndex={i}
                  />
                  <span className="text-[12px] text-muted-foreground font-medium">
                    {item.week}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shift Fulfillment Heatmap */}
        <Card
          className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up"
          style={{ animationDelay: "680ms" }}
        >
          <CardHeader className="pb-4 px-6 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold">
                  Shift Fulfillment Heatmap
                </CardTitle>
                <CardDescription className="text-[12px] mt-0.5">
                  Departmental efficiency by shift type
                </CardDescription>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pb-3 w-24">
                      Shift
                    </th>
                    {heatmapData.departments.map((dept, i) => (
                      <th
                        key={i}
                        className="text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pb-3 px-1"
                      >
                        {dept}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.shifts.map((shift, si) => (
                    <tr key={si}>
                      <td className="text-[12px] font-medium text-muted-foreground py-1.5 pr-3">
                        {shift}
                      </td>
                      {heatmapData.data[si].map((val, di) => (
                        <td key={di} className="px-1 py-1.5">
                          <div
                            className={`${getHeatColor(val)} text-[12px] font-bold rounded-md py-2.5 px-1 text-center transition-opacity hover:opacity-90 cursor-default select-none`}
                          >
                            {val}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Legend */}
            <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-border/40">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  &ge; 85%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-amber-400" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  70&ndash;84%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-red-400" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  &lt; 70%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
