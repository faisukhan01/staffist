'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import AuthCoverPanel from '@/components/auth/AuthCoverPanel';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAppStore();
  const [role, setRole] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleSuccess = (submittedRole: 'user' | 'admin') => {
    signIn(submittedRole);
    if (submittedRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Back to Home */}
      <div className="relative z-10 w-full max-w-[820px] mb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-[820px] my-4 rounded-2xl shadow-2xl shadow-black/40 flex flex-col md:flex-row bg-white overflow-hidden"
      >
        {/* Cover — left side (hidden on mobile) */}
        <div className="hidden md:flex md:w-[42%] flex-shrink-0">
          <AuthCoverPanel type="sign-in" role={role} />
        </div>
        {/* Form — full width on mobile, 58% on md+ */}
        <div className="w-full md:w-[58%] min-w-0">
          <SignInForm onSuccess={handleSuccess} role={role} onRoleChange={setRole} />
        </div>
      </motion.div>
    </div>
  );
}
