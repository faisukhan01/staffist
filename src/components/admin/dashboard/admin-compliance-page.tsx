"use client";

import React, { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Search,
  Mail,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  CircleDot,
  ArrowUpRight,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type StaffStatus = "safe" | "warning" | "danger";

interface StaffMember {
  name: string;
  role: string;
  department: string;
  dbs: string;
  rightToWork: string;
  registration: string;
  expiry: string;
  status: StaffStatus;
}

const staffData: StaffMember[] = [
  {
    name: "Sarah Johnson",
    role: "Registered Nurse",
    department: "Emergency",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "NMC Active",
    expiry: "15 Mar 2026",
    status: "safe",
  },
  {
    name: "Michael Chen",
    role: "Healthcare Assistant",
    department: "Cardiology",
    dbs: "Verified",
    rightToWork: "HCPC Active",
    registration: "Verified",
    expiry: "28 Feb 2026",
    status: "warning",
  },
  {
    name: "Emma Thompson",
    role: "Physiotherapist",
    department: "Rehabilitation",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "HCPC Active",
    expiry: "05 Mar 2026",
    status: "safe",
  },
  {
    name: "David Wilson",
    role: "Occupational Therapist",
    department: "Paediatrics",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "RCOT Active",
    expiry: "22 Aug 2025",
    status: "danger",
  },
  {
    name: "Lisa Martinez",
    role: "Mental Health Nurse",
    department: "Psychiatry",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "NMC Active",
    expiry: "10 Mar 2026",
    status: "safe",
  },
  {
    name: "James Anderson",
    role: "Anesthetist",
    department: "Surgery",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: " GMC Active",
    expiry: "12 Jan 2026",
    status: "danger",
  },
  {
    name: "Rachel Patel",
    role: "Midwife",
    department: "Maternity",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "NMC Active",
    expiry: "01 Apr 2026",
    status: "safe",
  },
  {
    name: "Tom Bradley",
    role: "Radiographer",
    department: "Radiology",
    dbs: "Verified",
    rightToWork: "Verified",
    registration: "HCPC Active",
    expiry: "18 Feb 2026",
    status: "warning",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const avatarGradients = [
  "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/30 text-blue-700 dark:text-blue-300",
  "from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/30 text-violet-700 dark:text-violet-300",
  "from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/30 text-emerald-700 dark:text-emerald-300",
  "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/30 text-amber-700 dark:text-amber-300",
  "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/30 text-rose-700 dark:text-rose-300",
  "from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/30 text-cyan-700 dark:text-cyan-300",
  "from-teal-100 to-teal-200 dark:from-teal-900/40 dark:to-teal-800/30 text-teal-700 dark:text-teal-300",
  "from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/30 text-indigo-700 dark:text-indigo-300",
];

function statusBadge(status: StaffStatus) {
  const configs: Record<StaffStatus, { icon: typeof ShieldCheck; label: string; classes: string }> = {
    safe: {
      icon: ShieldCheck,
      label: "Verified",
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
    },
    warning: {
      icon: Clock,
      label: "Expiring",
      classes: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
    },
    danger: {
      icon: ShieldX,
      label: "Expired",
      classes: "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40",
    },
  };
  const config = configs[status];
  const Icon = config.icon;
  return (
    <Badge
      variant="secondary"
      className={`${config.classes} text-[11px] font-medium px-2 py-0.5 h-5 border`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
}

function expiryColor(status: StaffStatus) {
  switch (status) {
    case "safe":
      return "text-foreground";
    case "warning":
      return "text-amber-600 dark:text-amber-400";
    case "danger":
      return "text-red-600 dark:text-red-400";
  }
}

function expiryIcon(status: StaffStatus) {
  if (status === "warning") return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
  if (status === "danger") return <ShieldX className="w-3.5 h-3.5 text-red-500" />;
  return <CircleDot className="w-3.5 h-3.5 text-muted-foreground/50" />;
}

// ---------------------------------------------------------------------------
// Stat Cards Data
// ---------------------------------------------------------------------------

const statsCards = [
  {
    title: "Total Staff",
    value: "247",
    change: "+12 this month",
    icon: Users,
    iconBg: "bg-blue-500",
    iconText: "text-white",
    ringColor: "ring-blue-500/10",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    changeColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Fully Verified",
    value: "231",
    change: "93.5% rate",
    icon: ShieldCheck,
    iconBg: "bg-emerald-500",
    iconText: "text-white",
    ringColor: "ring-emerald-500/10",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-600",
    changeColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Expiring Soon",
    value: "12",
    change: "Within 30 days",
    icon: ShieldAlert,
    iconBg: "bg-amber-500",
    iconText: "text-white",
    ringColor: "ring-amber-500/10",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    changeColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Action Required",
    value: "4",
    change: "Immediate attention",
    icon: ShieldX,
    iconBg: "bg-red-500",
    iconText: "text-white",
    ringColor: "ring-red-500/10",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-500",
    changeColor: "text-red-600 dark:text-red-400",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminCompliancePage() {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filtering
  const filteredData = useMemo(() => {
    return staffData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (statusFilter === "verified") matchesStatus = item.status === "safe";
      else if (statusFilter === "expiring") matchesStatus = item.status === "warning";
      else if (statusFilter === "expired") matchesStatus = item.status === "danger";

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  // Selection
  const toggleRow = (index: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    }
  };

  const isAllSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;
  const isSomeSelected = selectedRows.size > 0 && !isAllSelected;

  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-6">
      {/* ---------------------------------------------------------------- */}
      {/* Page Header                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-in-up">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-bold text-foreground tracking-tight">
            Compliance
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1">
            Track and manage staff compliance documentation and verification status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-[12px] h-8 rounded-lg border-border/50 text-muted-foreground hover:text-foreground"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
          <Button
            size="sm"
            className="text-[12px] h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Run Audit
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Stat Cards                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border border-border/50 card-stat bg-card group rounded-xl"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">
                      {stat.title}
                    </p>
                    <p className="text-[30px] font-bold text-foreground tracking-tight leading-none tabular-nums">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] font-medium ${stat.changeColor}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} text-white ring-4 ${stat.ringColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Compliance Table Card                                            */}
      {/* ---------------------------------------------------------------- */}
      <Card className="border border-border/50 card-elevated rounded-xl bg-card animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        {/* Card Header */}
        <CardHeader className="px-6 pt-5 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-[15px] font-semibold">
                Staff Compliance Records
              </CardTitle>
              <CardDescription className="text-[12px] mt-0.5">
                {filteredData.length} staff member{filteredData.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search name, role, dept..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="h-8 pl-9 pr-4 text-[13px] w-52 sm:w-60 border-border/50 bg-muted/30 focus:bg-background"
                />
              </div>
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="h-8 w-[130px] text-[13px] border-border/50 bg-muted/30 focus:bg-background">
                  <Filter className="w-3 h-3 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        {/* Bulk Action Bar */}
        {selectedRows.size > 0 && (
          <div className="mx-6 mt-4 flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 px-4 py-2.5 border border-blue-200/60 dark:border-blue-800/40 animate-fade-in-up">
            <span className="text-[13px] font-semibold text-blue-700 dark:text-blue-300">
              {selectedRows.size} selected
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                size="sm"
                className="h-7 text-[12px] bg-blue-600 hover:bg-blue-700 text-white px-3 font-medium rounded-lg shadow-sm shadow-blue-500/15"
              >
                <Mail className="w-3 h-3 mr-1.5" />
                Send Reminder
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-[12px] border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950/50 hover:text-blue-800 dark:hover:text-blue-200 px-3 rounded-lg"
              >
                <RefreshCw className="w-3 h-3 mr-1.5" />
                Renew Compliance
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/30">
                <TableHead className="w-10 pl-6">
                  <Checkbox
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) {
                        (el as unknown as HTMLInputElement).indeterminate = isSomeSelected;
                      }
                    }}
                    onCheckedChange={toggleAll}
                    aria-label="Select all rows"
                  />
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">
                  Staff Member
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] hidden md:table-cell">
                  Department
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] hidden sm:table-cell">
                  DBS Check
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] hidden lg:table-cell">
                  Registration
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">
                  Status
                </TableHead>
                <TableHead className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em]">
                  Expiry
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, i) => (
                <TableRow
                  key={item.name}
                  className="border-border/20 hover:bg-muted/20 transition-colors cursor-pointer group"
                >
                  <TableCell className="pl-6">
                    <Checkbox
                      checked={selectedRows.has(i)}
                      onCheckedChange={() => toggleRow(i)}
                      aria-label={`Select ${item.name}`}
                    />
                  </TableCell>
                  {/* Name with avatar */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} text-[11px] font-bold shrink-0`}
                      >
                        {getInitials(item.name)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[13px] font-medium text-foreground whitespace-nowrap group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-muted-foreground md:hidden">{item.department}</p>
                      </div>
                    </div>
                  </TableCell>
                  {/* Department */}
                  <TableCell className="hidden md:table-cell">
                    <span className="text-[12px] text-muted-foreground">
                      {item.department}
                    </span>
                  </TableCell>
                  {/* DBS Check */}
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40 text-[11px] font-medium px-2 py-0.5 h-5 border"
                    >
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      {item.dbs}
                    </Badge>
                  </TableCell>
                  {/* Professional Registration */}
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-[12px] text-muted-foreground">
                      {item.registration}
                    </span>
                  </TableCell>
                  {/* Status */}
                  <TableCell>
                    {statusBadge(item.status)}
                  </TableCell>
                  {/* Expiry */}
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {expiryIcon(item.status)}
                      <span className={`text-[12px] font-medium ${expiryColor(item.status)} tabular-nums`}>
                        {item.expiry}
                      </span>
                    </div>
                  </TableCell>
                  {/* Actions */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ShieldAlert className="w-8 h-8 text-muted-foreground/40" />
                      <p className="text-[13px] text-muted-foreground">
                        No staff members found matching your criteria.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[12px] text-blue-600 hover:text-blue-700 h-7"
                        onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/30">
          <p className="text-[12px] text-muted-foreground">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border/50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                className={`h-8 w-8 text-[12px] rounded-lg ${
                  page === currentPage
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg border-border/50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Compliance Breakdown                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <Card className="border border-border/50 card-elevated rounded-xl bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">DBS Checks</p>
                <p className="text-[11px] text-muted-foreground">Disclosure & Barring Service</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-muted-foreground">Verified</span>
              <span className="text-[12px] font-bold text-foreground tabular-nums">94%</span>
            </div>
            <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full progress-animated"
                style={{ width: "94%" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 card-elevated rounded-xl bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">Right to Work</p>
                <p className="text-[11px] text-muted-foreground">Eligibility verification</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-muted-foreground">Verified</span>
              <span className="text-[12px] font-bold text-foreground tabular-nums">98%</span>
            </div>
            <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full progress-animated"
                style={{ width: "98%", animationDelay: "150ms" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 card-elevated rounded-xl bg-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/30">
                <ShieldAlert className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground">Professional Registration</p>
                <p className="text-[11px] text-muted-foreground">NMC, HCPC, GMC, RCOT</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-medium text-muted-foreground">Active</span>
              <span className="text-[12px] font-bold text-foreground tabular-nums">87%</span>
            </div>
            <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full progress-animated"
                style={{ width: "87%", animationDelay: "300ms" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
