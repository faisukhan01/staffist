'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, X, Calendar, Clock, MapPin, Building2, 
  User, Mail, Phone, Award, PoundSterling, AlertCircle,
  FileText, Shield, Star, Briefcase
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

/* ═══════════════════════════════════════════════════════════════
   Approve Shift Dialog - Compact & Professional
   ═══════════════════════════════════════════════════════════════ */

interface ApproveShiftDialogProps {
  open: boolean;
  onClose: () => void;
  shiftTitle: string;
  requestedBy: string;
  detail: string;
}

export function ApproveShiftDialog({ open, onClose, shiftTitle, requestedBy, detail }: ApproveShiftDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: 'Shift Approved',
      description: `${shiftTitle} has been approved successfully.`,
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="sm">
      <AnimatedDialogHeader>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <AnimatedDialogTitle className="text-base">Approve Shift</AnimatedDialogTitle>
        </div>
      </AnimatedDialogHeader>

      <form onSubmit={handleSubmit}>
        <AnimatedDialogContent className="space-y-3 py-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{shiftTitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Requested by <span className="font-medium text-foreground">{requestedBy}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-900 dark:text-blue-300">
              Eligible staff will be notified immediately.
            </p>
          </div>
        </AnimatedDialogContent>

        <AnimatedDialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            size="sm"
            className="h-8 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                Approving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Approve
              </>
            )}
          </Button>
        </AnimatedDialogFooter>
      </form>
    </AnimatedDialog>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Decline Shift Dialog - Compact & Professional
   ═══════════════════════════════════════════════════════════════ */

interface DeclineShiftDialogProps {
  open: boolean;
  onClose: () => void;
  shiftTitle: string;
}

export function DeclineShiftDialog({ open, onClose, shiftTitle }: DeclineShiftDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: 'Shift Declined',
      description: `${shiftTitle} has been declined.`,
      variant: 'destructive',
    });

    setIsSubmitting(false);
    onClose();
    setReason('');
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="sm">
      <AnimatedDialogHeader>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30">
            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <AnimatedDialogTitle className="text-base">Decline Shift</AnimatedDialogTitle>
        </div>
      </AnimatedDialogHeader>

      <form onSubmit={handleSubmit}>
        <AnimatedDialogContent className="space-y-3 py-4">
          <div className="p-2.5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30">
            <p className="text-sm font-medium text-foreground">{shiftTitle}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="decline-reason" className="text-xs font-medium">
              Reason for declining *
            </Label>
            <textarea
              id="decline-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a brief explanation..."
              rows={3}
              required
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
            />
          </div>
        </AnimatedDialogContent>

        <AnimatedDialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            size="sm"
            className="h-8 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !reason.trim()}
            size="sm"
            className="h-8 text-xs bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                Declining...
              </>
            ) : (
              'Decline'
            )}
          </Button>
        </AnimatedDialogFooter>
      </form>
    </AnimatedDialog>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Assign Staff Dialog - Compact & Professional
   ═══════════════════════════════════════════════════════════════ */

interface AssignStaffDialogProps {
  open: boolean;
  onClose: () => void;
  candidateName: string;
  candidateQualification: string;
  candidateRating: number;
}

export function AssignStaffDialog({ 
  open, 
  onClose, 
  candidateName, 
  candidateQualification,
  candidateRating 
}: AssignStaffDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: 'Staff Assigned',
      description: `${candidateName} has been assigned to the shift.`,
    });

    setIsSubmitting(false);
    onClose();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="sm">
      <AnimatedDialogHeader>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <AnimatedDialogTitle className="text-base">Assign Staff</AnimatedDialogTitle>
        </div>
      </AnimatedDialogHeader>

      <form onSubmit={handleSubmit}>
        <AnimatedDialogContent className="space-y-3 py-4">
          {/* Candidate Info */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <Avatar className="w-10 h-10 ring-2 ring-white dark:ring-slate-800">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold">
                {getInitials(candidateName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{candidateName}</p>
              <p className="text-xs text-muted-foreground">{candidateQualification}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold">{candidateRating}</span>
                </div>
                <Badge variant="secondary" className="h-4 text-[10px] px-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Shield className="w-2.5 h-2.5 mr-0.5" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Shift Details */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Monday, February 17, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>08:00 - 20:00 (12 hours)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>Emergency Department</span>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-900 dark:text-blue-300">
              Candidate will receive email and SMS notification.
            </p>
          </div>
        </AnimatedDialogContent>

        <AnimatedDialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            size="sm"
            className="h-8 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                Assigning...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Assign
              </>
            )}
          </Button>
        </AnimatedDialogFooter>
      </form>
    </AnimatedDialog>
  );
}

/* ═══════════════════════════════════════════════════════════════
   View Candidate Profile Dialog - Compact & Professional
   ═══════════════════════════════════════════════════════════════ */

interface ViewCandidateDialogProps {
  open: boolean;
  onClose: () => void;
  candidateName: string;
}

export function ViewCandidateDialog({ open, onClose, candidateName }: ViewCandidateDialogProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="md">
      <AnimatedDialogHeader>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <AnimatedDialogTitle className="text-base">Candidate Profile</AnimatedDialogTitle>
        </div>
      </AnimatedDialogHeader>

      <AnimatedDialogContent className="space-y-3 py-4">
        {/* Profile Header */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-slate-800">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold">
              {getInitials(candidateName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-foreground">{candidateName}</h3>
            <p className="text-xs text-muted-foreground">Registered Nurse, IV Certified</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold">4.9</span>
              </div>
              <Badge variant="secondary" className="h-4 text-[10px] px-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Shield className="w-2.5 h-2.5 mr-0.5" />
                Verified
              </Badge>
              <Badge variant="secondary" className="h-4 text-[10px] px-1.5">42 Shifts</Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Experience', value: '5 years' },
            { label: 'Department', value: 'Emergency' },
            { label: 'Availability', value: 'Immediate' },
          ].map((stat) => (
            <div key={stat.label} className="p-2 bg-muted/50 rounded-lg border border-border text-center">
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Qualifications */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Qualifications
          </h4>
          <div className="space-y-1.5">
            {[
              'NMC Registration - Valid until Dec 2026',
              'IV Therapy Certification - Valid',
              'BLS Certification - Valid until Mar 2026',
            ].map((qual, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-background rounded-lg border border-border">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="text-xs text-foreground">{qual}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
          <p className="text-xs text-emerald-900 dark:text-emerald-300">
            <strong>Excellent performance</strong> across 42 shifts with 100% attendance rate.
          </p>
        </div>
      </AnimatedDialogContent>

      <AnimatedDialogFooter className="gap-2">
        <Button variant="outline" onClick={onClose} size="sm" className="h-8 text-xs">
          Close
        </Button>
        <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
          <Mail className="w-3.5 h-3.5 mr-1.5" />
          Contact
        </Button>
      </AnimatedDialogFooter>
    </AnimatedDialog>
  );
}
