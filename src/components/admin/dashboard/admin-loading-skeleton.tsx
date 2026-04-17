"use client";

import React from "react";

export function AdminDashboardSkeleton() {
  return (
    <div className="p-5 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-2">
          <div className="h-7 w-40 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-72 rounded-md skeleton-shimmer" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-lg skeleton-shimmer" />
          <div className="h-8 w-24 rounded-lg skeleton-shimmer" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-border/60 bg-card">
            <div className="space-y-3">
              <div className="h-3 w-24 rounded-md skeleton-shimmer" />
              <div className="h-8 w-16 rounded-md skeleton-shimmer" />
              <div className="h-3 w-20 rounded-md skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Approvals row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 p-6 rounded-xl border border-border/60 bg-card">
          <div className="space-y-4">
            <div className="h-5 w-40 rounded-md skeleton-shimmer" />
            <div className="h-3 w-56 rounded-md skeleton-shimmer" />
            <div className="flex items-end gap-3 h-44">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-1 space-y-2">
                  <div className="h-3 w-8 mx-auto rounded-md skeleton-shimmer" />
                  <div className="w-full rounded-md skeleton-shimmer" style={{ height: `${40 + Math.random() * 60}%` }} />
                  <div className="h-3 w-8 mx-auto rounded-md skeleton-shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/60 bg-card">
          <div className="space-y-4">
            <div className="h-5 w-36 rounded-md skeleton-shimmer" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg border border-border/40 space-y-2">
                <div className="h-4 w-full rounded-md skeleton-shimmer" />
                <div className="h-3 w-48 rounded-md skeleton-shimmer" />
                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-md skeleton-shimmer" />
                  <div className="h-7 w-16 rounded-md skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table + AI row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 p-6 rounded-xl border border-border/60 bg-card">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <div className="h-5 w-40 rounded-md skeleton-shimmer" />
                <div className="h-3 w-56 rounded-md skeleton-shimmer" />
              </div>
              <div className="h-7 w-16 rounded-md skeleton-shimmer" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-7 h-7 rounded-full skeleton-shimmer" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded-md skeleton-shimmer" />
                  <div className="h-3 w-20 rounded-md skeleton-shimmer" />
                </div>
                <div className="h-5 w-16 rounded-full skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/60 bg-card">
          <div className="space-y-4">
            <div className="h-5 w-28 rounded-md skeleton-shimmer" />
            <div className="h-24 rounded-lg skeleton-shimmer" />
            <div className="h-24 rounded-lg skeleton-shimmer" />
            <div className="h-12 rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
