'use client';

import { useState } from 'react';
import { InfoDialog } from '@/components/dialogs/InfoDialog';

export default function Footer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'privacy' | 'terms' | 'cookies' | 'help'>('privacy');

  const handleLinkClick = (type: 'privacy' | 'terms' | 'cookies' | 'help') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const cols = {
    Platform: ['For Providers', 'For Professionals', 'Compliance'],
    Company: ['About', 'Careers', 'Contact'],
    Support: [
      { label: 'Help Center', action: () => handleLinkClick('help') },
      { label: 'Privacy Policy', action: () => handleLinkClick('privacy') },
      { label: 'Terms of Service', action: () => handleLinkClick('terms') },
    ],
  };

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8]">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-[8px] bg-[#2563EB] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-[-0.01em]">Staffist</span>
            </div>
            <p className="text-[13px] leading-[1.7] max-w-[280px] text-[#64748B]">
              AI-powered ethical healthcare staffing for the NHS and private institutions.
            </p>
          </div>
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[13px] font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => {
                  const isObject = typeof l === 'object';
                  const label = isObject ? l.label : l;
                  const action = isObject ? l.action : undefined;
                  
                  return (
                    <li key={label}>
                      <button
                        onClick={action}
                        className="text-[13px] text-[#64748B] hover:text-white transition-colors text-left"
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#475569]">&copy; 2026 Staffist. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy', action: () => handleLinkClick('privacy') },
              { label: 'Terms', action: () => handleLinkClick('terms') },
              { label: 'Cookies', action: () => handleLinkClick('cookies') },
            ].map((l) => (
              <button
                key={l.label}
                onClick={l.action}
                className="text-[12px] text-[#475569] hover:text-[#94A3B8] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <InfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} type={dialogType} />
    </footer>
  );
}
