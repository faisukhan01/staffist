'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft, Mail, Lock, User, Eye, EyeOff, Check,
  Building2, Stethoscope, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';

export default function SignUpPage() {
  const { navigateTo, signIn } = useAppStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<'professional' | 'provider'>('professional');
  const [step, setStep] = useState(1);

  const handleSignUp = () => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); signIn(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(37,99,235,0.1),0_2px_12px_rgba(0,0,0,0.06)] p-8">

          {/* Back */}
          <button
            onClick={() => step === 1 ? navigateTo('landing') : setStep(1)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 mb-7 text-[13px] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{step === 1 ? 'Back to home' : 'Back'}
          </button>

          {/* Logo */}
          <Image src="/logo.png" alt="Staffist" width={200} height={60} className="w-[160px] h-auto object-contain mb-6" />

          {/* Step dots */}
          <div className="flex items-center gap-2 mb-7">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s ? <Check className="w-3 h-3" /> : s}
                </div>
                {s < 2 && <div className={`w-8 h-px transition-all ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`} />}
              </div>
            ))}
            <span className="text-[12px] text-slate-400 ml-2 font-medium">Step {step} of 2</span>
          </div>

          <AnimatePresence mode="wait">

            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-6">
                  <h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.022em]">Create your account</h1>
                  <p className="text-[14px] text-slate-500 mt-1">Choose how you want to use Staffist</p>
                </div>

                <div className="space-y-3 mb-6">
                  {([
                    { t: 'professional' as const, icon: Stethoscope, title: 'Healthcare Professional', desc: 'Find shifts, manage your compliance' },
                    { t: 'provider' as const,      icon: Building2,   title: 'Healthcare Provider',     desc: 'Post shifts, manage your staff' },
                  ]).map((opt) => (
                    <button
                      key={opt.t}
                      onClick={() => setType(opt.t)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        type === opt.t
                          ? 'border-blue-500 bg-blue-50/50 shadow-[0_0_0_4px_rgba(37,99,235,0.08)]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${type === opt.t ? 'bg-blue-600' : 'bg-slate-100'}`}>
                          <opt.icon className={`w-5 h-5 transition-colors ${type === opt.t ? 'text-white' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] font-semibold text-slate-900">{opt.title}</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">{opt.desc}</p>
                        </div>
                        {type === opt.t && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full h-[48px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_18px_rgba(37,99,235,0.4)] transition-all group"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.form
                key="s2"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22 }}
                onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}
                className="space-y-4"
              >
                <div className="mb-5">
                  <h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.022em]">Set up your profile</h1>
                  <p className="text-[14px] text-slate-500 mt-1">Fill in your details to get started</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold text-slate-700">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input type="text" placeholder="Your full name"
                      className="pl-10 h-[46px] bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold text-slate-700">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input type="email" placeholder="you@organisation.nhs.uk"
                      className="pl-10 h-[46px] bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold text-slate-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Create a strong password"
                      className="pl-10 pr-10 h-[46px] bg-slate-50 border-slate-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-400 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 pt-1 cursor-pointer">
                  <input type="checkbox"
                    className="mt-[3px] w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 accent-blue-600" />
                  <span className="text-[12px] text-slate-500 leading-relaxed">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 font-semibold hover:text-blue-700">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-blue-600 font-semibold hover:text-blue-700">Privacy Policy</button>
                  </span>
                </label>

                <Button type="submit" disabled={isSubmitting}
                  className="w-full h-[48px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[14px] font-semibold shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_18px_rgba(37,99,235,0.4)] disabled:opacity-60 transition-all mt-1">
                  {isSubmitting
                    ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }} className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full" />
                    : 'Create Account'
                  }
                </Button>
              </motion.form>
            )}

          </AnimatePresence>

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Already have an account?{' '}
            <button onClick={() => navigateTo('signin')} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
