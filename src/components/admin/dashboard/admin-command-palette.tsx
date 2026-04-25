"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  LayoutDashboard,
  ClipboardList,
  ArrowRight,
  Shield,
  BarChart3,
  UserPlus,
} from "lucide-react";
import type { PageView } from "@/components/admin/dashboard/admin-sidebar";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
}

const pages: { id: PageView; label: string; description: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", description: "Overview of workforce, compliance & AI insights", icon: LayoutDashboard },
  { id: "staff-requests", label: "Staff Requests", description: "Create shifts & AI-powered candidate matching", icon: ClipboardList },
  { id: "compliance", label: "Compliance", description: "Monitor staff certifications and compliance status", icon: Shield },
  { id: "analytics", label: "Analytics", description: "View performance metrics and workforce analytics", icon: BarChart3 },
  { id: "registration", label: "Registration", description: "Manage staff registration and onboarding", icon: UserPlus },
];

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = pages.filter(
    (p) =>
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback(
    (view: PageView) => {
      onNavigate(view);
      onClose();
      setSearch("");
    },
    [onNavigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        handleSelect(filtered[selectedIndex].id);
      } else if (e.key === "Escape") {
        onClose();
        setSearch("");
      }
    },
    [open, filtered, selectedIndex, handleSelect, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => { onClose(); setSearch(""); }}
      />
      <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2">
        <div className="mx-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-border overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
              placeholder="Search pages, actions..."
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-[13px] text-muted-foreground">No results found</p>
              </div>
            ) : (
              filtered.map((page, i) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => handleSelect(page.id)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                      i === selectedIndex
                        ? "bg-blue-50 dark:bg-blue-950/30"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <div
                      className={cn(
                        "p-1.5 rounded-md flex-shrink-0",
                        i === selectedIndex
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground">{page.label}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{page.description}</p>
                    </div>
                    {i === selectedIndex && (
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <kbd className="inline-flex items-center px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
                ↑↓
              </kbd>
              <span className="text-[10px] text-muted-foreground">navigate</span>
              <kbd className="inline-flex items-center px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
                ↵
              </kbd>
              <span className="text-[10px] text-muted-foreground">select</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Staffist</span>
          </div>
        </div>
      </div>
    </>
  );
}
