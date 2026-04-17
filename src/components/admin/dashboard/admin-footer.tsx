"use client";

import React from "react";
import { Hospital, Heart, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white dark:bg-slate-900 mt-auto">
      <div className="px-5 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Hospital className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-foreground">Staffist</span>
              <span className="text-[11px] text-muted-foreground">AI-Powered Healthcare Staffing</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span>© 2026 Staffist</span>
            <div className="hidden sm:flex items-center gap-1">
              <Heart className="w-3 h-3 text-emerald-500" />
              <span>Ethical Recruitment</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Shield className="w-3 h-3 text-blue-500" />
              <span>GDPR Ready</span>
            </div>
            <span className="text-muted-foreground/60">v2.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
