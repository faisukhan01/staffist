'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function SignInPage() {
  const { navigateTo, signIn } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); signIn(); }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(37,99,235,0.1),0_2px_12px_rgba(0,0,0,0.06)] p-8">

          {/* Back */}
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 mb-7 text-[13px] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />Back to home
          </button>

          {/* Logo + heading */}
          <div className="mb-8">
            <Image src="/logo.png" alt="Staffist" width={200} height={60} className="w-[160px] h-auto object-contain mb-6" />
            <h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.022em]">Welcome back</h1>
            <p className="text-[14px] text-slate-500 mt-1">Sign in to your Staffist account</p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[13px] font-semibold text-slate-700">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="you@organisation.nhs.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-[46px] bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[13px] font-semibold text-slate-700">Password</Label>
                <button type="button" className="text-[12px] text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-[46px] bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[48px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_18px_rgba(37,99,235,0.4)] disabled:opacity-60 transition-all mt-2"
            >
              {isSubmitting
                ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full" />
                : 'Sign In'
              }
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[12px] text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Don&apos;t have an account?{' '}
            <button onClick={() => navigateTo('signup')} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Create one free
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
