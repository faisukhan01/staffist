'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  AnimatedDialog,
  AnimatedDialogHeader,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
  AnimatedDialogContent,
  AnimatedDialogFooter,
} from '@/components/ui/animated-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ShiftDetails {
  dept: string;
  role: string;
  rate: string;
  date: string;
  time: string;
  location?: string;
}

interface ApplyShiftDialogProps {
  open: boolean;
  onClose: () => void;
  shift: ShiftDetails | null;
}

export function ApplyShiftDialog({ open, onClose, shift }: ApplyShiftDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: 'Application Submitted!',
      description: 'Your shift application has been sent for approval.',
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setNotes('');
    }, 2000);
  };

  if (!shift) return null;

  return (
    <AnimatedDialog open={open} onClose={onClose} size="md">
      {!isSuccess ? (
        <>
          <AnimatedDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <AnimatedDialogTitle>Apply for Shift</AnimatedDialogTitle>
            </div>
            <AnimatedDialogDescription>
              Review the shift details and confirm your application.
            </AnimatedDialogDescription>
          </AnimatedDialogHeader>

          <form onSubmit={handleSubmit}>
            <AnimatedDialogContent className="space-y-4">
              {/* Shift Details Card */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Shift Details
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {shift.dept}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {shift.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">{shift.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300">{shift.time}</p>
                  </div>

                  {shift.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <p className="text-sm text-slate-700 dark:text-slate-300">{shift.location}</p>
                    </div>
                  )}

                  <div className="pt-2 mt-2 border-t border-blue-200 dark:border-blue-900/30">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {shift.rate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compliance Check */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                      Compliance Verified
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      All required certifications and checks are up to date for this shift.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="shift-notes" className="text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <textarea
                  id="shift-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or notes for this shift..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Info Notice */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <AlertCircle className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Your application will be reviewed by the shift coordinator. You'll receive a notification once it's approved.
                </p>
              </div>
            </AnimatedDialogContent>

            <AnimatedDialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Confirm Application'
                )}
              </Button>
            </AnimatedDialogFooter>
          </form>
        </>
      ) : (
        <AnimatedDialogContent className="py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Application Submitted!
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Your application for the <strong>{shift.dept}</strong> shift has been submitted successfully. You'll be notified once it's reviewed.
            </p>
          </motion.div>
        </AnimatedDialogContent>
      )}
    </AnimatedDialog>
  );
}
