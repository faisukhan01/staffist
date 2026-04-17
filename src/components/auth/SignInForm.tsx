'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthInput, SocialLoginButtons, Divider } from './AuthShared';

interface SignInFormProps {
  onSuccess?: (role: 'user' | 'admin') => void;
  onRoleChange?: (role: 'user' | 'admin') => void;
  role: 'user' | 'admin';
}

type Role = 'user' | 'admin';

export default function SignInForm({ onSuccess, onRoleChange, role }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const submittedRole = role; // capture role at submit time
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onSuccess?.(submittedRole); }, 1500);
  };

  const handleRoleSwitch = (r: Role) => {
    setEmail('');
    setPassword('');
    setErrors({});
    onRoleChange?.(r);
  };

  return (
    <div className="w-full px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-8 md:px-10 md:pt-7 md:pb-10 box-border">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
        {/* Back to Home */}
        <div className="mb-4 mt-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {role === 'admin' ? 'Admin Sign In' : 'Sign In'}
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          {role === 'admin'
            ? 'Welcome, Admin! Sign in to manage your team, approve shifts, and oversee compliance.'
            : 'Welcome back! Sign in to view your shifts, check compliance status, and connect with your team.'}
        </p>

        {/* Role toggle */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-6">
          {(['user', 'admin'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleSwitch(r)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === r ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {role === r && (
                <motion.div
                  layoutId="role-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: r === 'admin' ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {r === 'admin' ? <ShieldCheck size={14} /> : <User size={14} />}
                {r === 'admin' ? 'Admin' : 'Staff / Provider'}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, x: role === 'admin' ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: role === 'admin' ? -12 : 12 }}
            transition={{ duration: 0.22 }}
          >
            {role === 'admin' && (
              <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                <ShieldCheck size={16} className="text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-snug">
                  Admin access is restricted. Use your organisation-issued credentials to sign in.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                id={`${role}-signin-email`}
                type="email"
                placeholder={role === 'admin' ? 'Admin Email' : 'Email Address'}
                icon={<Mail size={17} />}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                error={errors.email}
                autoComplete="email"
              />

              <AuthInput
                id={`${role}-signin-password`}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                icon={<Lock size={17} />}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                error={errors.password}
                togglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-[#667eea]" />
                  <span className="text-sm text-gray-500">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold text-[#667eea] hover:text-[#5b4fcf] transition-colors">
                  Forgot password?
                </button>
              </div>

              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-70 transition-all duration-200 hover:shadow-lg"
                style={{
                  background: role === 'admin'
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: role === 'admin' ? '0 4px 14px rgba(245,158,11,0.3)' : '0 4px 14px rgba(102,126,234,0.3)',
                }}
              >
                {isLoading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Sign In{role === 'admin' ? ' as Admin' : ''}</span><ArrowRight size={17} /></>}
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence>

        {role === 'user' && (
          <>
            <Divider />
            <SocialLoginButtons />
          </>
        )}

        <p className="text-sm text-gray-400 text-center mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-semibold text-[#667eea] hover:text-[#5b4fcf] transition-colors">
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-center mt-3">
          <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={13} />
            Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
