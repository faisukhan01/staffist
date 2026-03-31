'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, AlertTriangle, Clock, Upload, Download,
  ChevronRight, Shield, GraduationCap, HeartPulse, Award,
  ArrowRight, Bell, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

/* ── Score Circle ── */
function ScoreCircle({ score }: { score: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#E2E8F0" strokeWidth="7" />
        <motion.circle cx="48" cy="48" r={r} fill="none" stroke="#2563EB" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-xl font-bold text-slate-900 leading-none">{score}%</motion.span>
        <span className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-wide">Score</span>
      </div>
    </div>
  );
}

/* ── Data ── */
type Severity = 'safe' | 'warning' | 'urgent' | 'info';

const sevCfg: Record<Severity, { dot: string; text: string; bg: string; border: string; icon: React.ElementType }> = {
  safe:    { dot:'bg-emerald-500', text:'text-emerald-700', bg:'bg-emerald-50', border:'border-emerald-200', icon:CheckCircle2  },
  warning: { dot:'bg-amber-500',   text:'text-amber-700',   bg:'bg-amber-50',   border:'border-amber-200',   icon:AlertTriangle },
  urgent:  { dot:'bg-red-500',     text:'text-red-700',     bg:'bg-red-50',     border:'border-red-200',     icon:AlertTriangle },
  info:    { dot:'bg-blue-500',    text:'text-blue-700',    bg:'bg-blue-50',    border:'border-blue-200',    icon:Clock         },
};

const documents = [
  { title:'DBS Certificate',   status:'Valid',          detail:'Valid until Dec 2026',  action:'Replace', severity:'safe'    as Severity },
  { title:'Passport',          status:'Expiring Soon',  detail:'Expires in 90 days',    action:'Update',  severity:'warning' as Severity },
  { title:'Visa Document',     status:'Active',         detail:'Valid until Mar 2025',  action:'Replace', severity:'info'    as Severity },
  { title:'NMC Registration',  status:'Action Needed',  detail:'Renewal in 45 days',    action:'Upload',  severity:'urgent'  as Severity },
];

const timeline = [
  { title:'DBS Certificate',  label:'24 months remaining', severity:'safe'    as Severity },
  { title:'Passport',         label:'3 months remaining',  severity:'warning' as Severity },
  { title:'Visa Document',    label:'10 months remaining', severity:'info'    as Severity },
  { title:'NMC Registration', label:'45 days remaining',   severity:'urgent'  as Severity },
];

const additionalCerts = [
  { title:'Immunization Records', sub:'Updated: Jan 2024',   icon:HeartPulse },
  { title:'Degree Certificate',   sub:'BSN, 2018',           icon:GraduationCap },
  { title:'CPR Certification',    sub:'Expires: Nov 2024',   icon:Award },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
});

/* ── Component ── */
export default function ComplianceContent() {
  const { setSidebarOpen } = useAppStore();
  const [reminders, setReminders] = useState(true);

  return (
    <div className="flex-1 min-h-screen bg-[#F0F4FF]">

      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 h-[72px] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base md:text-xl font-semibold text-slate-900 tracking-tight truncate">Compliance &amp; Documents</h1>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5 hidden sm:block">Manage your certifications, documents and compliance status.</p>
          </div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="px-4 md:px-8 py-6 md:py-8 max-w-[1100px] space-y-5 md:space-y-6">

        {/* Score + Summary Card */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0)}
          className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ScoreCircle score={92} />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-slate-900">Compliance Score</h2>
              <p className="text-sm text-slate-500 mt-1">You are fully eligible for most NHS placements.</p>
              <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />Active Status
                </span>
                <span className="text-xs text-slate-400">Last updated today</span>
              </div>
            </div>
            {/* Quick stats + download */}
            <div className="flex flex-col items-center sm:items-end gap-3 shrink-0 w-full sm:w-auto">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium px-4 h-9 shadow-sm w-full sm:w-auto">
                <Download className="w-4 h-4 mr-1.5" />Download Report
              </Button>
              <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
                {[
                  { label:'Valid',    value:'3', color:'text-emerald-600', bg:'bg-emerald-50' },
                  { label:'Expiring', value:'1', color:'text-amber-600',   bg:'bg-amber-50'   },
                  { label:'Urgent',   value:'1', color:'text-red-600',     bg:'bg-red-50'     },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-xl px-4 py-3 text-center`}>
                    <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alert */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.06)}>
          <div className="flex items-start gap-3 px-4 md:px-5 py-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-900">Action Required</p>
              <p className="text-sm text-amber-700 mt-0.5">Your NMC Registration renewal is due in 45 days. Upload your renewal documents to stay compliant.</p>
            </div>
            <button className="shrink-0 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors">
              Upload Now
            </button>
          </div>
        </motion.div>

        {/* Documents Grid */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.1)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Documents</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Upload Guidelines <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((doc, i) => {
              const cfg = sevCfg[doc.severity];
              const Icon = cfg.icon;
              return (
                <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp(0.1 + i * 0.04)}
                  className={`bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${doc.severity === 'urgent' ? 'border-red-200' : doc.severity === 'warning' ? 'border-amber-200' : 'border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-4.5 h-4.5 ${cfg.text}`} style={{ width: 18, height: 18 }} />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{doc.title}</p>
                  <p className={`text-xs font-semibold mt-1 ${cfg.text}`}>{doc.status}</p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-4">{doc.detail}</p>
                  <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 rounded-lg transition-colors">
                    <Upload className="w-3.5 h-3.5" />{doc.action}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Expiry Timeline */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.18)}
          className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Expiry Timeline</h3>
              <p className="text-xs text-slate-400 mt-0.5">Track renewal dates across all documents</p>
            </div>
            <button onClick={() => setReminders(!reminders)}
              className="flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-slate-700 transition-colors">
              <Bell className="w-4 h-4" />
              <div className={`w-8 h-4.5 rounded-full transition-colors duration-200 relative flex items-center ${reminders ? 'bg-blue-600' : 'bg-slate-200'}`}
                style={{ height: 18 }}>
                <div className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform duration-200 ${reminders ? 'translate-x-[14px]' : 'translate-x-[2px]'}`} />
              </div>
              Reminders
            </button>
          </div>

          {/* Timeline bar */}
          <div className="relative mb-6">
            <div className="absolute top-3.5 left-0 right-0 h-px bg-slate-100" />
            <div className="relative flex justify-between">
              {timeline.map((t, i) => {
                const cfg = sevCfg[t.severity];
                return (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex flex-col items-center gap-2">
                    <div className={`w-7 h-7 rounded-full border-2 border-white shadow-md flex items-center justify-center ${cfg.dot}`}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {timeline.map((t, i) => {
              const cfg = sevCfg[t.severity];
              return (
                <div key={i} className="bg-slate-50 rounded-xl p-3.5">
                  <p className="text-sm font-semibold text-slate-800">{t.title}</p>
                  <p className={`text-xs font-medium mt-1 ${cfg.text}`}>{t.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Certifications */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.24)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Additional Certifications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Add Certificate <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {additionalCerts.map((cert, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <cert.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cert.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cert.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3 h-3" />Valid
                  </span>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shield footer note */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0.28)}>
          <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border border-blue-100 rounded-xl">
            <Shield className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-sm text-blue-700">
              All documents are encrypted and stored securely in compliance with NHS data protection standards.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
