'use client';

import {
  AnimatedDialog,
  AnimatedDialogHeader,
  AnimatedDialogTitle,
  AnimatedDialogContent,
} from '@/components/ui/animated-dialog';
import { Shield, FileText, Cookie, HelpCircle } from 'lucide-react';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookies' | 'help';
}

const contentMap = {
  privacy: {
    icon: Shield,
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
        <p>
          At Staffist, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Information We Collect</h3>
        <p>
          We collect information you provide directly to us, including name, email address, phone number, and professional credentials necessary for healthcare staffing compliance.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">How We Use Your Information</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>To provide and maintain our staffing platform services</li>
          <li>To verify compliance with healthcare regulations</li>
          <li>To match you with appropriate shifts and opportunities</li>
          <li>To communicate with you about your account and shifts</li>
          <li>To improve our services and user experience</li>
        </ul>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest. We are GDPR compliant and ICO registered.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal information at any time. Contact us at privacy@staffist.com for any data-related requests.
        </p>
      </div>
    ),
  },
  terms: {
    icon: FileText,
    title: 'Terms of Service',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
        <p>
          Welcome to Staffist. By using our platform, you agree to these terms and conditions.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">1. Acceptance of Terms</h3>
        <p>
          By accessing and using Staffist, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">2. User Responsibilities</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Maintain accurate and up-to-date professional credentials</li>
          <li>Comply with all applicable healthcare regulations</li>
          <li>Honor shift commitments once accepted</li>
          <li>Maintain professional conduct at all times</li>
          <li>Protect your account credentials</li>
        </ul>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">3. Platform Usage</h3>
        <p>
          You agree to use Staffist only for lawful purposes and in accordance with these Terms. You may not use our platform to engage in any fraudulent or illegal activity.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">4. Compliance Verification</h3>
        <p>
          All users must maintain valid DBS checks, Right to Work documentation, and professional certifications as required by UK healthcare regulations.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">5. Termination</h3>
        <p>
          We reserve the right to terminate or suspend access to our platform immediately, without prior notice, for conduct that we believe violates these Terms.
        </p>
      </div>
    ),
  },
  cookies: {
    icon: Cookie,
    title: 'Cookie Policy',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
        <p>
          Staffist uses cookies to enhance your experience on our platform. This policy explains what cookies are and how we use them.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Types of Cookies We Use</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
          <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform</li>
          <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Analytics Cookies:</strong> Help us improve our services</li>
        </ul>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Managing Cookies</h3>
        <p>
          You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our platform.
        </p>
      </div>
    ),
  },
  help: {
    icon: HelpCircle,
    title: 'Help & Support',
    content: (
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
        <p>
          Need help? We're here to support you. Here are some common questions and ways to get in touch.
        </p>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Frequently Asked Questions</h3>
        <div className="space-y-3">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">How do I update my compliance documents?</p>
            <p className="mt-1">Navigate to the Compliance section in your dashboard and upload your updated documents.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">How do I apply for shifts?</p>
            <p className="mt-1">Browse available shifts in the My Shifts section and click "Apply" on any shift that matches your qualifications.</p>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">What if I need to cancel a shift?</p>
            <p className="mt-1">Contact your shift coordinator as soon as possible. Cancellation policies vary by organization.</p>
          </div>
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-6">Contact Support</h3>
        <div className="space-y-2">
          <p><strong>Email:</strong> support@staffist.com</p>
          <p><strong>Phone:</strong> +44 20 1234 5678</p>
          <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30 mt-6">
          <p className="text-blue-900 dark:text-blue-300 font-medium">
            For urgent issues outside business hours, please contact your shift coordinator directly.
          </p>
        </div>
      </div>
    ),
  },
};

export function InfoDialog({ open, onClose, type }: InfoDialogProps) {
  const content = contentMap[type];
  const Icon = content.icon;

  return (
    <AnimatedDialog open={open} onClose={onClose} size="lg">
      <AnimatedDialogHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <AnimatedDialogTitle>{content.title}</AnimatedDialogTitle>
        </div>
      </AnimatedDialogHeader>

      <AnimatedDialogContent className="max-h-[60vh] overflow-y-auto">
        {content.content}
      </AnimatedDialogContent>
    </AnimatedDialog>
  );
}
