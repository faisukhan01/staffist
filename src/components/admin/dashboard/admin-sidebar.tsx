"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  Search,
  Settings,
  LogOut,
  Hospital,
  Menu,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  User,
  HelpCircle,
  ChevronDown,
  Shield,
  BarChart3,
  UserPlus,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CommandPalette } from "@/components/admin/dashboard/admin-command-palette";
import { Footer } from "@/components/admin/dashboard/admin-footer";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export type PageView =
  | "dashboard"
  | "staff-requests"
  | "candidate-profile"
  | "compliance"
  | "analytics"
  | "registration";

const pageMeta: Record<PageView, { label: string; group?: string }> = {
  dashboard: { label: "Dashboard" },
  "staff-requests": { label: "Staff Requests" },
  "candidate-profile": { label: "Candidate Profile", group: "Staff Requests" },
  compliance: { label: "Compliance" },
  analytics: { label: "Analytics" },
  registration: { label: "Registration" },
};

const navItems: { id: PageView; label: string; icon: React.ElementType; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "staff-requests", label: "Staff Requests", icon: ClipboardList, badge: 3 },
  { id: "compliance", label: "Compliance", icon: Shield },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "registration", label: "Registration", icon: UserPlus },
];

const notifications = [
  { id: 1, title: "Shift approval needed", description: "Night Shift — Emergency Dept. requested by Dr. Roberts", time: "5 min ago", type: "warning" as const, read: false },
  { id: 2, title: "Compliance alert", description: "DBS check for Sarah Johnson expiring in 14 days", time: "1 hour ago", type: "danger" as const, read: false },
  { id: 3, title: "New candidate matched", description: "Emma Richardson — 5.0 rating, fully verified", time: "2 hours ago", type: "success" as const, read: true },
  { id: 4, title: "Shift completed", description: "James Anderson completed ICU shift successfully", time: "3 hours ago", type: "info" as const, read: true },
];

/* ───────────────────────── Sidebar ───────────────────────── */

interface SidebarProps {
  activeView: PageView;
  onViewChange: (view: PageView) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function Sidebar({ activeView, onViewChange, mobileOpen, onMobileClose }: SidebarProps) {
  const isMobile = useIsMobile();

  const handleNav = (view: PageView) => {
    onViewChange(view);
    if (isMobile) onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-[56px] border-b border-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
          <Hospital className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[15px] font-semibold text-foreground tracking-tight leading-none">Staffist</span>
          <span className="text-[10px] text-muted-foreground font-medium mt-0.5 tracking-wide uppercase">Admin Portal</span>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMobileClose} className="ml-auto h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4 px-3">
        <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-2">Menu</p>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-[38px] rounded-lg text-[13px] font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 dark:bg-blue-500 rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground/70 group-hover:text-foreground"
                  )}
                  strokeWidth={isActive ? 2.2 : 1.7}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge ? (
                  <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-blue-600 text-[10px] font-bold text-white rounded-full leading-none">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t border-border p-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold">SM</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate leading-tight">St. Mary&apos;s NHS Trust</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Active Plan</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {mobileOpen && <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onMobileClose} />}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-[272px] bg-background text-foreground flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl border-r border-border",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen bg-background text-foreground flex flex-col w-[240px] border-r border-border">
      {sidebarContent}
    </aside>
  );
}

/* ───────────────────────── TopBar ───────────────────────── */

interface TopBarProps {
  onMobileMenuOpen: () => void;
  onCommandPaletteOpen: () => void;
  activeView: PageView;
}

function TopBar({ onMobileMenuOpen, onCommandPaletteOpen, activeView }: TopBarProps) {
  const isMobile = useIsMobile();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const router = useRouter();
  const { signOut } = useAppStore();

  const meta = pageMeta[activeView];
  const breadcrumb = meta?.group ? (
    <>
      <span className="text-muted-foreground">{meta.group}</span>
      <ChevronRight className="w-3 h-3 text-muted-foreground" />
      <span className="text-foreground font-medium">{meta.label}</span>
    </>
  ) : (
    <span className="text-foreground font-medium">{meta?.label}</span>
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-[56px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-4 sm:px-5 ml-0 md:ml-[240px]">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMobileMenuOpen}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted md:hidden">
          <Menu className="w-[18px] h-[18px]" />
        </Button>
        <nav className="hidden sm:flex items-center gap-1.5 text-[13px]">
          {breadcrumb}
        </nav>
        <span className="sm:hidden text-[13px] font-medium text-foreground">{meta?.label}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Search trigger */}
        <button
          onClick={onCommandPaletteOpen}
          className="hidden md:flex items-center h-8 pl-8 pr-3 w-56 bg-muted/40 border border-border/50 rounded-lg text-[13px] text-muted-foreground hover:border-blue-200 hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-300 transition-all cursor-pointer group relative"
        >
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground" />
          <span className="truncate">Search...</span>
          <kbd className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded bg-background text-[10px] font-mono text-muted-foreground border border-border/60 group-hover:border-blue-200">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <Button variant="ghost" size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm shadow-red-500/30">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[380px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-border/60 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <h3 className="text-[13px] font-semibold text-foreground">Notifications</h3>
                <Badge variant="secondary" className="text-[10px] font-medium bg-blue-50 text-blue-700 border-0 h-5">{unreadCount} new</Badge>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <button key={notif.id} className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors border-b border-border/30 last:border-0">
                    <div className={cn(
                      "mt-0.5 p-1.5 rounded-lg flex-shrink-0",
                      notif.type === "warning" && "bg-amber-50 text-amber-600 dark:bg-amber-950/40",
                      notif.type === "danger" && "bg-red-50 text-red-600 dark:bg-red-950/40",
                      notif.type === "success" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40",
                      notif.type === "info" && "bg-blue-50 text-blue-600 dark:bg-blue-950/40"
                    )}>
                      {notif.type === "warning" && <Clock className="w-3 h-3" />}
                      {notif.type === "danger" && <AlertTriangle className="w-3 h-3" />}
                      {notif.type === "success" && <CheckCircle2 className="w-3 h-3" />}
                      {notif.type === "info" && <MessageSquare className="w-3 h-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={cn("text-[13px] text-foreground truncate", !notif.read && "font-semibold")}>{notif.title}</p>
                        {!notif.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{notif.description}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">{notif.time}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border/50">
                <button className="w-full text-center text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1">
                  View all notifications <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 pl-1 pr-2 hover:bg-muted">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold">SM</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-[13px] font-medium leading-none">St. Mary&apos;s NHS Trust</p>
                <p className="text-[11px] text-muted-foreground leading-none mt-1">admin@stmarys.nhs.uk</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[13px] cursor-pointer"><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-[13px] cursor-pointer"><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-[13px] cursor-pointer"><HelpCircle className="mr-2 h-4 w-4" />Help &amp; Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-[13px] text-red-600 cursor-pointer focus:text-red-600"><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

/* ───────────────────────── AppShell ───────────────────────── */

interface AppShellProps {
  children: React.ReactNode;
  activeView: PageView;
  onViewChange: (view: PageView) => void;
}

export function AppShell({ children, activeView, onViewChange }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onViewChange]);

  return (
    <div className="min-h-screen bg-background dark:bg-[#0b1120] flex flex-col">
      <Sidebar
        activeView={activeView}
        onViewChange={onViewChange}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <TopBar
        onMobileMenuOpen={() => setMobileOpen(true)}
        onCommandPaletteOpen={() => setCommandOpen(true)}
        activeView={activeView}
      />
      <main className="pt-[56px] flex-1 md:ml-[240px] transition-all duration-300">
        {children}
      </main>
      <div className="md:ml-[240px] transition-all duration-300">
        <Footer />
      </div>
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={onViewChange}
      />
    </div>
  );
}
