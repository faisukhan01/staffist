'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Chrome,
  Apple,
  Shield,
  AtSign,
  ShieldCheck,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

// ==================== SVG Illustrations ====================

function DeskPersonIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[320px] mx-auto desk-illustration"
    >
      <rect x="60" y="200" width="280" height="12" rx="6" fill="#4a3f8a" opacity="0.8" />
      <rect x="80" y="212" width="8" height="80" rx="3" fill="#3d3478" />
      <rect x="312" y="212" width="8" height="80" rx="3" fill="#3d3478" />
      <rect x="70" y="285" width="60" height="8" rx="3" fill="#3d3478" />
      <rect x="270" y="285" width="60" height="8" rx="3" fill="#3d3478" />
      <rect x="110" y="182" width="160" height="18" rx="4" fill="#c8d6e5" />
      <rect x="108" y="196" width="164" height="6" rx="2" fill="#a4b0be" />
      <rect x="125" y="100" width="130" height="82" rx="6" fill="#2d3436" />
      <rect x="130" y="105" width="120" height="72" rx="4" fill="#6c5ce7" />
      <rect x="140" y="115" width="60" height="4" rx="2" fill="#a29bfe" opacity="0.8" />
      <rect x="140" y="125" width="100" height="3" rx="1.5" fill="#dfe6e9" opacity="0.5" />
      <rect x="140" y="133" width="85" height="3" rx="1.5" fill="#dfe6e9" opacity="0.4" />
      <rect x="140" y="141" width="95" height="3" rx="1.5" fill="#dfe6e9" opacity="0.3" />
      <rect x="140" y="153" width="40" height="14" rx="7" fill="#fff" opacity="0.3" />
      <rect x="190" y="153" width="40" height="14" rx="7" fill="#a29bfe" opacity="0.5" />
      <path d="M175 120 C175 120 165 150 165 170 L165 195 L230 195 L230 170 C230 150 220 120 220 120 Z" fill="#667eea" />
      <path d="M185 110 L197 135 L209 110" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" />
      <rect x="190" y="85" width="20" height="25" rx="8" fill="#f0c8a0" />
      <ellipse cx="200" cy="65" rx="28" ry="32" fill="#f0c8a0" />
      <path d="M172 55 C172 35 185 28 200 28 C215 28 228 35 228 55 C228 50 225 38 200 38 C175 38 172 50 172 55 Z" fill="#2d3436" />
      <ellipse cx="190" cy="62" rx="3.5" ry="4" fill="#2d3436" />
      <ellipse cx="210" cy="62" rx="3.5" ry="4" fill="#2d3436" />
      <circle cx="191" cy="61" r="1.2" fill="#fff" />
      <circle cx="211" cy="61" r="1.2" fill="#fff" />
      <path d="M192 80 Q200 87 208 80" stroke="#c0785c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="172" cy="65" rx="5" ry="7" fill="#f0c8a0" />
      <ellipse cx="228" cy="65" rx="5" ry="7" fill="#f0c8a0" />
      <path d="M170 130 C155 140 145 160 150 180 L155 190 L168 185 L165 175 C162 165 165 150 172 142" fill="#667eea" />
      <ellipse cx="155" cy="188" rx="8" ry="5" fill="#f0c8a0" transform="rotate(-10, 155, 188)" />
      <path d="M225 130 C240 140 250 160 245 180 L240 190 L227 185 L230 175 C233 165 230 150 223 142" fill="#667eea" />
      <ellipse cx="242" cy="188" rx="8" ry="5" fill="#f0c8a0" transform="rotate(10, 242, 188)" />
      <rect x="155" y="210" width="90" height="8" rx="4" fill="#4a3f8a" />
      <rect x="170" y="140" width="60" height="70" rx="8" fill="#4a3f8a" opacity="0.7" />
      <rect x="290" y="182" width="20" height="18" rx="3" fill="#fff" opacity="0.8" />
      <circle cx="80" cy="180" r="10" fill="#00b894" opacity="0.7" />
    </svg>
  );
}

function WelcomePersonIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[300px] mx-auto desk-illustration"
    >
      <rect x="175" y="210" width="14" height="70" rx="6" fill="#2d3436" />
      <rect x="210" y="210" width="14" height="70" rx="6" fill="#2d3436" />
      <ellipse cx="182" cy="282" rx="12" ry="6" fill="#2d3436" />
      <ellipse cx="217" cy="282" rx="12" ry="6" fill="#2d3436" />
      <path d="M168 100 C165 120 162 150 164 210 L235 210 C237 150 234 120 231 100 Z" fill="#764ba2" />
      <path d="M168 110 C145 100 130 80 135 55 L140 50" fill="#764ba2" />
      <ellipse cx="138" cy="48" rx="7" ry="6" fill="#f0c8a0" transform="rotate(-20, 138, 48)" />
      <path d="M231 110 C255 95 265 70 258 48" fill="#764ba2">
        <animateTransform attributeName="transform" type="rotate" values="0 231 110;5 231 110;0 231 110;-5 231 110;0 231 110" dur="1.5s" repeatCount="indefinite" />
      </path>
      <ellipse cx="260" cy="46" rx="7" ry="6" fill="#f0c8a0" transform="rotate(15, 260, 46)">
        <animateTransform attributeName="transform" type="rotate" values="15 260 46;20 260 46;15 260 46;10 260 46;15 260 46" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <rect x="192" y="72" width="16" height="22" rx="7" fill="#f0c8a0" />
      <ellipse cx="200" cy="50" rx="26" ry="30" fill="#f0c8a0" />
      <path d="M174 42 C174 22 187 15 200 15 C213 15 226 22 226 42 C226 37 223 25 200 25 C177 25 174 37 174 42 Z" fill="#6c5ce7" />
      <path d="M186 48 Q190 44 194 48" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M206 48 Q210 44 214 48" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M188 58 Q200 70 212 58" stroke="#c0785c" strokeWidth="2" fill="#e17055" opacity="0.5" strokeLinecap="round" />
      <ellipse cx="183" cy="56" rx="6" ry="3" fill="#fab1a0" opacity="0.4" />
      <ellipse cx="217" cy="56" rx="6" ry="3" fill="#fab1a0" opacity="0.4" />
      <g>
        <path d="M130 30 L133 20 L136 30 L146 33 L136 36 L133 46 L130 36 L120 33 Z" fill="#ffeaa7" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

// ==================== Particle Background ====================

function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 15,
      drift: (Math.random() - 0.5) * 60,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

// ==================== Floating Shapes ====================

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="float-shape-1 absolute w-20 h-20 rounded-full bg-white opacity-10" style={{ top: '15%', right: '10%' }} />
      <div className="float-shape-2 absolute w-14 h-14 rounded-full bg-white opacity-[0.07]" style={{ top: '60%', right: '25%' }} />
      <div className="float-shape-3 absolute w-24 h-24 rounded-full bg-white opacity-[0.05]" style={{ bottom: '15%', left: '5%' }} />
      <div className="float-shape-4 absolute w-10 h-10 rounded-lg bg-white opacity-[0.08] rotate-45" style={{ top: '40%', left: '15%' }} />
    </div>
  );
}

// ==================== Password Strength ====================

function getPasswordStrength(password: string): { score: number; label: string; color: string; width: string } {
  if (!password) return { score: 0, label: '', color: '#e5e7eb', width: '0%' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: 'Weak', color: '#ef4444', width: '20%' };
  if (score <= 2) return { score, label: 'Fair', color: '#f97316', width: '40%' };
  if (score <= 3) return { score, label: 'Good', color: '#eab308', width: '60%' };
  if (score <= 4) return { score, label: 'Strong', color: '#22c55e', width: '80%' };
  return { score, label: 'Very Strong', color: '#16a34a', width: '100%' };
}

// ==================== Floating Label Input ====================

interface FloatingInputProps {
  id: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: boolean;
  togglePassword?: () => void;
  showPassword?: boolean;
  autoComplete?: string;
}

function FloatingInput({ id, type, placeholder, icon, value, onChange, error, success, togglePassword, showPassword, autoComplete }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="login-input-wrapper relative" style={{ isolation: 'isolate' }}>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          autoComplete={autoComplete}
          className={`login-input w-full h-12 pl-11 pr-11 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm outline-none transition-all duration-300 ${error ? 'login-input-error' : success ? 'login-input-success' : ''}`}
        />
        <label
          htmlFor={id}
          className={`floating-label ${isActive ? 'top-0 translate-y-[-50%] !left-3 !text-xs !px-1 bg-white !text-[#667eea] !z-20' : ''}`}
        >
          {placeholder}
        </label>
        {togglePassword && (
          <button type="button" onClick={togglePassword} className="eye-toggle absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" tabIndex={-1}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ==================== Social Login Buttons ====================

function SocialLoginButtons() {
  return (
    <div className="flex items-center justify-center gap-4">
      <button type="button" className="social-btn w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:border-gray-300" aria-label="Sign in with Google">
        <Chrome size={20} className="text-gray-600" />
      </button>
      <button type="button" className="social-btn w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:border-gray-300" aria-label="Sign in with Facebook">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      <button type="button" className="social-btn w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:border-gray-300" aria-label="Sign in with Apple">
        <Apple size={20} className="text-gray-600" />
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium">Or continue with</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ==================== Cover Panel ====================

interface CoverPanelProps {
  type: 'login' | 'signup';
  role?: 'user' | 'admin';
}

const coverContent = {
  user: {
    heading: 'Welcome Back!',
    subtext: 'Sign in to manage your shifts, check compliance status, and connect with your healthcare team.',
  },
  admin: {
    heading: 'Welcome, Admin!',
    subtext: 'Sign in to manage your team, approve shifts, and oversee compliance across your organisation.',
  },
};

function CoverPanel({ type, role = 'user' }: CoverPanelProps) {
  const isLogin = type === 'login';
  const content = coverContent[role];
  return (
    <div
      className="relative flex flex-col items-center justify-center px-6 py-8 sm:px-8 sm:py-10 md:p-12 min-h-[180px] sm:min-h-[200px] md:min-h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden transition-all duration-500"
      style={{
        background: isLogin && role === 'admin'
          ? 'linear-gradient(145deg, #1e1b4b 0%, #4338ca 60%, #6366f1 100%)'
          : 'linear-gradient(145deg, #667eea 0%, #764ba2 60%, #8b6fd4 100%)',
      }}
    >
      <FloatingShapes />
      <div className="glow-circle absolute w-48 h-48 rounded-full bg-white/5 -top-10 -left-10" />
      <div className="glow-circle absolute w-36 h-36 rounded-full bg-white/5 -bottom-8 -right-8" style={{ animationDelay: '2s' }} />
      <div className="relative z-10 text-center">
        <div className="mb-4 md:mb-6 fade-in-slide" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          {isLogin ? <WelcomePersonIllustration /> : <DeskPersonIllustration />}
        </div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={`cover-heading-${role}-${type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-white mb-2 md:mb-3 leading-tight tracking-wide drop-shadow-lg"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            {isLogin ? content.heading : 'Hello, Friend!'}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`cover-subtext-${role}-${type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-[210px] sm:max-w-[230px] mx-auto tracking-wide"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontWeight: 300 }}
          >
            {isLogin
              ? content.subtext
              : 'Join Staffist and connect with NHS-compliant healthcare opportunities.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ==================== Login Form ====================

type LoginRole = 'user' | 'admin';

interface LoginFormProps {
  onToggle: () => void;
  onSignIn: () => void;
  onRoleChange: (role: 'user' | 'admin') => void;
}

function LoginForm({ onToggle, onSignIn, onRoleChange }: LoginFormProps) {
  const { navigateTo } = useAppStore();
  const [role, setRole] = useState<LoginRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRoleSwitch = (r: LoginRole) => {
    setRole(r);
    onRoleChange(r);
    setEmail('');
    setPassword('');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${rect.width / 2}px`;
      ripple.style.top = `${rect.height / 2}px`;
      ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
    }, 1500);
  };

  return (
    <div className="bg-white flex flex-col justify-start pt-3 pb-6 px-5 sm:px-7 md:px-9 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden mb-3 flex justify-center"
        style={{ height: '88px' }}
      >
        <Image src="/logo.png" alt="Staffist" width={700} height={467} className="w-auto object-contain" style={{ height: '140px', marginTop: '-18px' }} priority />
      </motion.div>

      <div className="slide-up">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Sign In</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-4">Welcome back! Please sign in to continue</p>
      </div>

      {/* Role selector — card style */}
      <div className="slide-up grid grid-cols-2 gap-2.5 mb-8">
        {(['user', 'admin'] as LoginRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRoleSwitch(r)}
            className={`relative flex flex-col items-center gap-2 py-3.5 px-3 rounded-2xl border-2 transition-all duration-250 ${
              role === r
                ? r === 'admin'
                  ? 'border-[#4338ca] bg-gradient-to-br from-[#1e1b4b]/5 to-[#4338ca]/10 shadow-lg shadow-[#4338ca]/15'
                  : 'border-[#667eea] bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/10 shadow-lg shadow-[#667eea]/15'
                : 'border-gray-200 bg-gray-50/60 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-250 ${
              role === r
                ? r === 'admin'
                  ? 'bg-gradient-to-br from-[#1e1b4b] to-[#4338ca] shadow-md shadow-[#4338ca]/35'
                  : 'bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-md shadow-[#667eea]/35'
                : 'bg-gray-200'
            }`}>
              {r === 'admin'
                ? <ShieldCheck size={16} className="text-white" />
                : <User size={16} className={role === r ? 'text-white' : 'text-gray-400'} />
              }
            </div>
            <span className={`text-xs font-bold tracking-wide transition-colors duration-200 ${
              role === r ? (r === 'admin' ? 'text-[#4338ca]' : 'text-[#667eea]') : 'text-gray-400'
            }`}>
              {r === 'admin' ? 'Admin' : 'Staff / Provider'}
            </span>
            {role === r && (
              <motion.div
                layoutId="role-dot"
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${r === 'admin' ? 'bg-[#4338ca]' : 'bg-[#667eea]'}`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 pt-2">
        <div className="slide-up slide-up-delay-1">
          <FloatingInput id={`${role}-login-email`} type="email" placeholder={role === 'admin' ? 'Admin Email Address' : 'Email Address'} icon={<Mail size={18} />} value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
            error={errors.email} success={!!(email && /\S+@\S+\.\S+/.test(email))} autoComplete="email" />
        </div>
        <div className="slide-up slide-up-delay-2">
          <FloatingInput id={`${role}-login-password`} type={showPassword ? 'text' : 'password'} placeholder="Password" icon={<Lock size={18} />} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
            error={errors.password} success={password.length >= 6} togglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} autoComplete="current-password" />
        </div>
        <div className="flex items-center justify-between slide-up slide-up-delay-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="custom-checkbox w-4 h-4 rounded" />
            <span className="text-sm text-gray-500">Remember me</span>
          </label>
          <button type="button" className="text-sm text-[#667eea] hover:text-[#764ba2] font-medium transition-colors">Forgot password?</button>
        </div>
        <div className="slide-up slide-up-delay-4">
          <motion.button
            ref={buttonRef}
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 transition-all duration-200 hover:shadow-lg"
            style={{
              background: role === 'admin'
                ? 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: role === 'admin' ? '0 4px 14px rgba(67,56,202,0.35)' : '0 4px 14px rgba(102,126,234,0.3)',
            }}
          >
            {isLoading ? <div className="spinner" /> : <><span>Sign In{role === 'admin' ? ' as Admin' : ''}</span><ArrowRight size={18} /></>}
          </motion.button>
        </div>
      </form>
      <div className="mt-5 sm:mt-6 text-center slide-up slide-up-delay-5">
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={onToggle} className="text-[#667eea] hover:text-[#764ba2] font-semibold transition-colors">Sign Up</button>
        </p>
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors mt-3"
        >
          <ArrowLeft size={13} />
          Back to Home
        </button>
      </div>
    </div>
  );
}

// ==================== Signup Form ====================

interface SignupFormProps {
  onToggle: () => void;
}

function SignupForm({ onToggle }: SignupFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; confirmPassword?: string; terms?: string }>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const passwordStrength = getPasswordStrength(password);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const btn = buttonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${rect.width / 2}px`;
      ripple.style.top = `${rect.height / 2}px`;
      ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="bg-white flex flex-col justify-start pt-3 pb-6 px-5 sm:px-7 md:px-9 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden mb-3 flex justify-center"
        style={{ height: '88px' }}
      >
        <Image src="/logo.png" alt="Staffist" width={700} height={467} className="w-auto object-contain" style={{ height: '140px', marginTop: '-18px' }} priority />
      </motion.div>

      <div className="slide-up">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-3">Join Staffist as a healthcare professional or provider.</p>
      </div>

      {/* Admin note */}
      <div className="slide-up flex items-start gap-2.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl mb-6">
        <ShieldCheck size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-snug">
          <span className="font-semibold text-slate-600">Admin account?</span> Admin credentials are provided directly by your Organisation — no sign-up required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="slide-up slide-up-delay-1">
          <FloatingInput id="signup-name" type="text" placeholder="Full Name" icon={<User size={18} />} value={fullName}
            onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined })); }}
            error={errors.fullName} success={fullName.trim().length > 0} autoComplete="name" />
        </div>
        <div className="slide-up slide-up-delay-1">
          <FloatingInput id="signup-email" type="email" placeholder="Email Address" icon={<AtSign size={18} />} value={email}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
            error={errors.email} success={!!(email && /\S+@\S+\.\S+/.test(email))} autoComplete="email" />
        </div>
        <div className="slide-up slide-up-delay-2">
          <FloatingInput id="signup-password" type={showPassword ? 'text' : 'password'} placeholder="Password" icon={<Shield size={18} />} value={password}
            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
            error={errors.password} success={password.length >= 8 && passwordStrength.score >= 3}
            togglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} autoComplete="new-password" />
          {password && (
            <div className="mt-1.5 px-1">
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="strength-bar rounded-full" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }} />
              </div>
              <p className="text-xs mt-0.5" style={{ color: passwordStrength.color }}>{passwordStrength.label}</p>
            </div>
          )}
        </div>
        <div className="slide-up slide-up-delay-3">
          <FloatingInput id="signup-confirm" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" icon={<Lock size={18} />} value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
            error={errors.confirmPassword} success={confirmPassword.length > 0 && password === confirmPassword}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)} showPassword={showConfirmPassword} autoComplete="new-password" />
        </div>
        <div className="slide-up slide-up-delay-3">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => { setAgreeTerms(e.target.checked); if (errors.terms) setErrors((p) => ({ ...p, terms: undefined })); }}
              className="custom-checkbox w-4 h-4 rounded mt-0.5" />
            <span className="text-sm text-gray-500 leading-snug">
              I agree to the{' '}
              <span className="text-[#667eea] hover:text-[#764ba2] cursor-pointer font-medium">Terms of Service</span>{' '}
              and{' '}
              <span className="text-[#667eea] hover:text-[#764ba2] cursor-pointer font-medium">Privacy Policy</span>
            </span>
          </label>
          {errors.terms && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-0.5 ml-6">{errors.terms}</motion.p>
          )}
        </div>
        <div className="slide-up slide-up-delay-4">
          <motion.button ref={buttonRef} type="submit" disabled={isLoading} whileTap={{ scale: 0.98 }}
            className="btn-gradient w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70">
            {isLoading ? <div className="spinner" /> : <><span>Create Account</span><ArrowRight size={18} /></>}
          </motion.button>
        </div>
      </form>
      <div className="mt-4 sm:mt-5 text-center slide-up slide-up-delay-5">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <button type="button" onClick={onToggle} className="text-[#667eea] hover:text-[#764ba2] font-semibold transition-colors">Sign In</button>
        </p>
      </div>
    </div>
  );
}

// ==================== Main Animated Login Page ====================

export default function AnimatedLoginPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginRole, setLoginRole] = useState<'user' | 'admin'>('user');
  const { signIn } = useAppStore();
  const loginRoleRef = useRef<'user' | 'admin'>('user');
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      // Scroll the face that is about to become visible back to top
      setTimeout(() => {
        if (next) backRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        else frontRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }, 50);
      return next;
    });
  }, []);

  const handleRoleChange = useCallback((r: 'user' | 'admin') => {
    setLoginRole(r);
    loginRoleRef.current = r;
  }, []);

  const handleSignIn = useCallback(() => {
    const role = loginRoleRef.current;
    signIn(role);
    if (role === 'admin') {
      window.location.href = '/admin';
    }
    // for 'user', the store update triggers page.tsx to show the dashboard
  }, [signIn]);

  return (
    <div className="bg-white flex items-center justify-center min-h-screen p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="flip-container relative z-10 w-full"
      >
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} style={{ minHeight: '640px' }}>
          {/* Front Face - Login */}
          <div className="flip-face flex flex-col md:flex-row rounded-2xl shadow-2xl shadow-black/30 overflow-hidden bg-white">
            <div className="w-full md:w-[42%] flex-shrink-0">
              <CoverPanel type="login" role={loginRole} />
            </div>
            <div ref={frontRef} className="w-full md:w-[58%] min-w-0 overflow-y-auto">
              <LoginForm onToggle={handleToggle} onSignIn={handleSignIn} onRoleChange={handleRoleChange} />
            </div>
          </div>
          {/* Back Face - Signup */}
          <div className="flip-face flip-face-back flex flex-col md:flex-row rounded-2xl shadow-2xl shadow-black/30 overflow-hidden bg-white">
            <div ref={backRef} className="w-full md:w-[58%] min-w-0 order-2 md:order-1 overflow-y-auto">
              <SignupForm onToggle={handleToggle} />
            </div>
            <div className="w-full md:w-[42%] flex-shrink-0 order-1 md:order-2">
              <CoverPanel type="signup" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
