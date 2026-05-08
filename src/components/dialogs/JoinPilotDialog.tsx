'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Building2, Users, CheckCircle2, MapPin } from 'lucide-react';
import {
  AnimatedDialog,
  AnimatedDialogHeader,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
  AnimatedDialogContent,
  AnimatedDialogFooter,
} from '@/components/ui/animated-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface JoinPilotDialogProps {
  open: boolean;
  onClose: () => void;
}

export function JoinPilotDialog({ open, onClose }: JoinPilotDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: 'Application Submitted!',
      description: 'We\'ll review your application and get back to you within 48 hours.',
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        organization: '',
        location: '',
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="md">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedDialogHeader>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
                    <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <AnimatedDialogTitle className="text-xl">Join Pilot Programme</AnimatedDialogTitle>
                </div>
              </div>
              <AnimatedDialogDescription className="text-sm">
                Be among the first to experience Staffist. Limited spots available for early adopters.
              </AnimatedDialogDescription>
            </AnimatedDialogHeader>

            <form onSubmit={handleSubmit}>
              <AnimatedDialogContent className="space-y-3 py-3">
                <div className="p-3 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg border border-violet-100/50 dark:border-violet-900/30">
                  <p className="text-xs font-semibold text-violet-900 dark:text-violet-300 mb-1.5">
                    Pilot Benefits:
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-600" />
                      <span>1 month free trial + 50% off for 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-600" />
                      <span>Priority support & dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-violet-600" />
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <Label htmlFor="pilot-name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="pilot-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="pl-10 h-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="pilot-email" className="text-sm font-medium">
                      Work Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="pilot-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@carehome.com"
                        className="pl-10 h-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="pilot-organization" className="text-sm font-medium">
                      Organization *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="pilot-organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Care Home / NHS Trust"
                        className="pl-10 h-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="pilot-location" className="text-sm font-medium">
                      Location *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="pilot-location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="London, UK"
                        className="pl-10 h-9"
                        required
                      />
                    </div>
                  </div>
                </div>
              </AnimatedDialogContent>

              <AnimatedDialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </AnimatedDialogFooter>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <AnimatedDialogContent className="py-10">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/30 dark:to-purple-950/30 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                >
                  Application Received!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-slate-600 dark:text-slate-400 max-w-sm"
                >
                  Thank you for your interest! We'll review your application and contact you at <strong className="text-slate-900 dark:text-white">{formData.email}</strong> within 48 hours.
                </motion.p>
              </div>
            </AnimatedDialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedDialog>
  );
}
